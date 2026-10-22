# Open Dental API Rules

## Single Source of Truth
- For **ALL** Open Dental related functionality, the single source of truth is the official API specification:
  **https://www.opendental.com/site/apispecification.html**

## Before Writing or Changing Code
- Before writing or changing any code that calls the Open Dental API, open that page (and the relevant sub-page for the resource, e.g. patients, appointments, communications) and follow the documented endpoints, HTTP methods, parameters, request/response shapes and authentication **exactly**.
- **Never** guess or invent endpoints, fields or parameters. If something is not in the spec, say so and ask.

## Client Architecture
- All Open Dental calls go through one typed client in `src/lib/open-dental/` (`client.ts` plus one file per resource).
- **Components never call the API directly.**

## Credentials
- Store the API credentials in **environment variables only**.
