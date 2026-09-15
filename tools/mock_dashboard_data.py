"""Generate synthetic ALP Coach analytics data in the shape of the live API,
so the real dashboard UI can be screenshotted without showing real users.
Numbers are illustrative only."""
import json, random, uuid, sys, math
from datetime import datetime, timedelta

OUT = sys.argv[1]
random.seed(20261014)

PATHS = {
    "Fundamentals of Cooperatives": {"Understanding Cooperatives": ["Introduction to Cooperatives", "Cooperative Governance", "Managing Meetings"]},
    "Producer Organization Essentials": {"Product Aggregation": ["Collection from Farmers", "Procuring Produce"], "Bookkeeping for Producer Organizations": ["Cash Ledger", "Sales Records"]},
    "Fundamentals of Retail Management": {"Inventory Management": ["Record Keeping for Inventory", "Inventory and Business Cycles"], "Customer Care": ["Retailers and Shops", "Customer Care"]},
    "Bookkeeping Essentials": {"Bookkeeping and Your Business": ["What is Bookkeeping", "Introduction to Bookkeeping", "Next Steps for Bookkeeping"], "Bookkeeping Ledgers": ["Cash Ledger", "Sales and Roleplay"]},
    "Finance and Accounting": {"Cost Management": ["Introduction to Cost Management", "Basic Pricing Strategies"], "Working with Credit": ["Introduction to Credit"]},
    "Growing Your Business": {"Business Planning": ["Elements of a Business Plan", "Smart Objectives"], "Marketing Strategies": ["Marketing Strategy Part 1"]},
    "Internal Management": {"Leadership": ["Entrepreneurship and Leadership", "Managing Staff"]},
    "Business Sustainability": {"Business Relationships": ["Building Business Relationships"]},
    "Fundamentals of ALP Coaching": {"Coaching Skills": ["Introduction to Coaching", "Running a Coaching Session"]},
}
PATH_WEIGHTS = {
    "bangladesh": [10, 14, 16, 18, 9, 11, 6, 5, 11],
    "tanzania": [4, 9, 24, 26, 12, 9, 6, 4, 6],
}
COUNTRIES = {
    "bangladesh": dict(users=412, questions=1280, start=datetime(2026, 1, 12), end=datetime(2026, 9, 12),
                       regions=["Rangpur", "Dhaka", "Mymensingh", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Chattogram"],
                       region_w=[24, 20, 14, 12, 11, 8, 6, 5], roles=["Coach", "AE", "Employee of an AE", "Family member of an AE", "Other"],
                       role_w=[34, 38, 12, 8, 8], gender_w=[58, 42], trainings=[(datetime(2026, 2, 3), 38), (datetime(2026, 3, 17), 46), (datetime(2026, 5, 6), 52), (datetime(2026, 6, 24), 61), (datetime(2026, 8, 12), 74)]),
    "tanzania": dict(users=268, questions=940, start=datetime(2026, 1, 19), end=datetime(2026, 9, 12),
                     regions=["Mara", "Geita", "Mwanza", "Simiyu", "Shinyanga", "Other"],
                     region_w=[30, 22, 18, 12, 10, 8], roles=["AE", "Employee of an AE", "Coach", "Family member of an AE", "Other"],
                     role_w=[44, 18, 16, 10, 12], gender_w=[46, 54], trainings=[(datetime(2026, 2, 17), 31), (datetime(2026, 4, 8), 44), (datetime(2026, 6, 10), 39), (datetime(2026, 7, 29), 47)]),
}
AGES = ["20-34", "35-59", "0-19", "60-74"]
AGE_W = [52, 34, 8, 6]
QUESTIONS = [
    "What is the ABC method?", "How do I keep my stock records?", "How can I save money from my business?",
    "What is a cash budget?", "How do I price my products?", "My customer says my price is too high, what should I do?",
    "How do I write a business plan?", "What records should a cooperative keep?", "How do I handle a customer who wants credit?",
    "What is bookkeeping and why is it important?", "How do I set objectives for my shop?", "How can I attract more customers?",
    "What is a cash ledger?", "How do I calculate my profit?", "How do I manage a meeting with members?",
    "What is inventory management?", "How can I reduce my costs?", "How do I know which products sell best?",
    "What is a producer organization?", "How do I aggregate produce from farmers?", "How do I motivate my staff?",
    "What is a SMART objective?", "How do I record credit sales?", "How can I grow my business?",
    "What is cost management?", "How do I plan for the season?", "How should I store my products?",
    "What is customer care?", "How do I deal with competition?", "How do I keep my books every day?",
]
INTENTS = ["Knowledge Seeking", "Problem Solving", "Decision Making", "Clarification", "Off-Topic"]
INTENT_W = [60, 23, 8, 6, 3]
COMPLEX = ["beginner", "intermediate", "advanced"]
COMPLEX_W = [68, 26, 6]


def pick(items, weights):
    return random.choices(items, weights=weights, k=1)[0]


def ts(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%f")


def build(country, cfg):
    paths = list(PATHS)
    pw = PATH_WEIGHTS[country]
    users = []
    # Join dates: training-day cohorts plus organic trickle
    join_dates = []
    for day, n in cfg["trainings"]:
        join_dates += [day + timedelta(hours=random.uniform(9, 17)) for _ in range(n)]
    while len(join_dates) < cfg["users"]:
        d = cfg["start"] + timedelta(days=random.uniform(0, (cfg["end"] - cfg["start"]).days))
        join_dates.append(d.replace(hour=random.randint(6, 21), minute=random.randint(0, 59)))
    join_dates = sorted(join_dates)[: cfg["users"]]

    events, convs = [], []
    lp_queries = {p: 0 for p in paths}
    for i, joined in enumerate(join_dates):
        uid = f"{random.randint(100000000, 999999999)}"
        prof = dict(gender=pick(["Man", "Woman"], cfg["gender_w"]), age=pick(AGES, AGE_W),
                    region=pick(cfg["regions"], cfg["region_w"]), role=pick(cfg["roles"], cfg["role_w"]))
        n_sessions = pick([1, 2, 3, 4, 5, 6, 8, 11], [22, 20, 16, 13, 10, 8, 6, 5])
        session_days = [joined] + sorted(joined + timedelta(days=random.expovariate(1 / 18), hours=random.uniform(-3, 8)) for _ in range(n_sessions - 1))
        session_days = [d for d in session_days if d <= cfg["end"]]
        active = len(session_days) > 1 or random.random() < 0.55
        for s_idx, s_start in enumerate(session_days):
            sid = str(uuid.uuid4())
            t = s_start
            def ev(action, **extra):
                nonlocal t
                events.append(dict(id=str(uuid.uuid4()), user_id=uid, action=action, session_id=sid, **prof,
                                   active_user=active, new_user=(s_idx == 0), language="en", voice_gender=None,
                                   learning_path_id=None, learning_path_name=None, category_id=None, category_name=None,
                                   course_id=None, course_name=None, is_correct=None, created_at=ts(t), language_code="en") | extra)
                t += timedelta(seconds=random.uniform(20, 140))
            if s_idx == 0:
                for a in ["bot_started", "set_language", "set_name", "set_gender", "set_age", "region_set", "role_set"]:
                    ev(a)
            if random.random() < 0.72:
                lp = pick(paths, pw)
                cat = random.choice(list(PATHS[lp]))
                course = random.choice(PATHS[lp][cat])
                lp_id = str(paths.index(lp) + 1)
                lp_queries[lp] += random.randint(2, 6)
                ev("Select learning path", learning_path_id=lp_id, learning_path_name=lp)
                ev("Select category", learning_path_id=lp_id, learning_path_name=lp, category_name=cat)
                ev("Select course", learning_path_id=lp_id, learning_path_name=lp, category_name=cat, course_name=course)
                for _ in range(random.randint(2, 9)):
                    ev("Press continue button", learning_path_id=lp_id, learning_path_name=lp, category_name=cat, course_name=course)
                if random.random() < 0.55:
                    for _ in range(random.randint(1, 3)):
                        ev("quiz_answered", learning_path_id=lp_id, learning_path_name=lp, category_name=cat, course_name=course,
                           is_correct=random.random() < 0.68)
            if random.random() < 0.6:
                n_q = pick([1, 2, 3, 4, 5, 6], [40, 25, 15, 10, 6, 4])
                for q_idx in range(n_q):
                    ev("handle_rag_message")
                    convs.append(dict(id=str(uuid.uuid4()), question=random.choice(QUESTIONS), question_translated=None, answer=None,
                                      latency_ms=random.randint(2800, 9000), cost_usd=None, event_time=ts(t), date=t.strftime("%Y-%m-%dT00:00:00"),
                                      session_id=sid, user_id_main=uid, complexity_level=None, user_intent=pick(INTENTS, INTENT_W),
                                      question_complexity=pick(COMPLEX, COMPLEX_W), learning_path=pick(paths, pw), question_id=str(uuid.uuid4()),
                                      has_follow_up_questions=q_idx < n_q - 1, question_count=n_q, example_follow_up_question=None,
                                      example_previous_question=None, has_difficulty=random.random() < 0.08,
                                      difficulty_type=None, evidence=None, **prof, created_at=ts(t), language_code="en", type=None))
        users.append(uid)

    # trim / pad conversation count toward the target
    random.shuffle(convs)
    convs = convs[: cfg["questions"]]
    convs.sort(key=lambda c: c["event_time"])
    events.sort(key=lambda e: e["created_at"])
    overview = dict(aggregate=dict(totalUsers=len(users), totalQuestions=len(convs)),
                    popularTopics=[dict(topic=p, learningPathId=str(paths.index(p) + 1), queryCount=n)
                                   for p, n in sorted(lp_queries.items(), key=lambda kv: -kv[1])])
    json.dump(dict(total=len(events), items=events, limit=100000, offset=0), open(f"{OUT}/{country}-user.json", "w"))
    json.dump(dict(total=len(convs), items=convs, limit=10000, offset=0), open(f"{OUT}/{country}-conv.json", "w"))
    json.dump(overview, open(f"{OUT}/{country}-overview.json", "w"))
    print(country, "users", len(users), "events", len(events), "questions", len(convs), "top", overview["popularTopics"][:3])


for c, cfg in COUNTRIES.items():
    build(c, cfg)
