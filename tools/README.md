# tools

`mock_dashboard_data.py` generates synthetic analytics data in the shape of the
ALP Coach data API. It was used to produce the dashboard screenshots in
`public/images/alp/dashboard/` from the real dashboard UI without showing real
users. To regenerate: run it with an output folder, copy the JSON into the
dashboard repo's `static/mock/`, point `COUNTRY_CONFIG` in
`src/lib/utils/overviewData.ts` at `/mock/*.json`, run `npm run dev`, and
screenshot `/`, `/bangladesh`, `/tanzania`, `/bangladesh/conversation`.
Revert the dashboard changes afterwards.
