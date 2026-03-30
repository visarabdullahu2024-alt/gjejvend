# Gjejvend

SpotHero-inspired parking reservation simulator for Kosovo, built as a university project demo.

## What the app simulates

- parking search by destination, date, and time
- price comparison across garages, lots, valet, airport, event, and monthly parking
- reserve and prepay flow
- savings vs. walk-in pricing
- reservation details stored in-app with navigation links
- Apple CarPlay / Android Auto style support messaging for presentation purposes

This is a simulator, not a real parking marketplace. Payments, inventory, and reservations are demo data stored in browser local storage.

## Run locally

```bash
cd "/Users/vis/Documents/New project/app"
python3 server.py
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Deploy to GitHub

1. Create a new GitHub repository.
2. Push this project.
3. Use either Netlify or Render with the settings below.

## Deploy to Netlify

- Publish directory: `app`
- Build command: none

If you use drag-and-drop deployment, upload the `app` folder contents.

## Deploy to Render

This repo includes [`render.yaml`](/Users/vis/Documents/New project/render.yaml) for simple deployment.

1. Push the repo to GitHub.
2. In Render, choose `New +` then `Blueprint`.
3. Connect the repository.
4. Render will deploy the static Python server from the `app` directory.

## Notes for your presentation

- Brand name used here: `Gjejvend`
- Geography used here: Kosovo cities plus Prishtine Airport
- Main assumption: this is a concept demo modeled after SpotHero's reservation flow, not a production app
