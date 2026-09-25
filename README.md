# 🛰️ OrbitXAI

## Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis

> **OrbitXAI** is an Earth Observation Intelligence platform designed to allow users to interact with satellite imagery using natural-language queries, temporal comparison, multisensor analysis, AI-assisted interpretation, visual evidence, and explainable analysis workflows.

---

# 🌍 Overview

Modern Earth-observation satellites generate enormous volumes of remote-sensing imagery. Extracting useful information from this data traditionally requires knowledge of GIS, remote sensing, image processing, and machine learning.

**OrbitXAI** aims to simplify satellite-image analysis by combining:

- 🛰️ Earth Observation
- 🤖 Artificial Intelligence
- 👁️ Computer Vision
- 🧠 Vision-Language Models
- 🗺️ Geospatial Intelligence
- ⏳ Temporal Analysis
- 📡 Multisensor Analysis
- 🔎 Evidence-Based AI
- 📊 Explainable AI

The platform is designed around a simple idea:

> **Ask questions about satellite imagery in natural language and receive structured, evidence-based geospatial intelligence.**

---

# 🎯 Problem Statement

Satellite imagery contains valuable information about:

- Urban expansion
- Agriculture
- Forests
- Water bodies
- Infrastructure
- Natural disasters
- Land-use and land-cover changes
- Environmental changes

However, traditional satellite-image analysis can be complex and time-consuming.

Users often need specialized tools and knowledge to:

- Load satellite imagery
- Understand different sensors
- Compare temporal imagery
- Identify objects
- Detect changes
- Interpret geospatial information
- Understand AI predictions

Many AI systems also provide a final answer without clearly explaining:

> **What was detected?**

> **Where was it detected?**

> **What evidence supports the result?**

> **How was the result generated?**

OrbitXAI is designed to address these challenges through an interactive multimodal Earth Observation intelligence workflow.

---

# 💡 Proposed Solution

OrbitXAI provides a unified analysis workspace where users can:

1. Upload satellite imagery.
2. Preview and inspect imagery.
3. Compare images from different time periods.
4. Switch between Optical and SAR imagery.
5. Ask questions using natural language.
6. Run AI-assisted analysis.
7. Identify relevant regions.
8. View supporting evidence.
9. Inspect the analysis process.
10. Receive structured and explainable results.

---

# 🚀 Key Features

## 🖼️ 1. Single Image Analysis

Analyze an individual satellite image.

### Current capabilities

- Image upload
- Image preview
- Image removal
- Zoom controls
- Grid overlay
- Coordinate display UI
- Fullscreen viewer UI
- Image metadata foundation

---

# ⏳ 2. Temporal Analysis

OrbitXAI supports a temporal analysis workflow using two images:

```text
T1 — Earlier
      ↓
Temporal Analysis
      ↓
T2 — Later
```


# 🚀 How to Execute OrbitXAI

Follow the steps below to run OrbitXAI locally.

---

## 📋 Prerequisites

Make sure the following software is installed:

- **Git**
- **Node.js 18+**
- **npm**
- **Python 3.11**
- **Anaconda / Miniconda**
- **VS Code** (recommended)

Check installations:

```powershell
git --version
node --version
npm --version
python --version
conda --version
```


1️⃣ Clone the Repository

Open PowerShell or Command Prompt:

git clone https://github.com/Sushilcoder/orbitXAI.git

Move into the project:

cd orbitXAI

The project structure should look approximately like:

orbitXAI/
│
├── frontend/
├── backend/
├── README.md
└── ...
2️⃣ Run the Frontend

Open a terminal and navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the Next.js development server:

npm run dev

You should see something similar to:

▲ Next.js
- Local: http://localhost:3000

Open your browser:

http://localhost:3000
3️⃣ Run the Backend

Open a second terminal.

Navigate to the backend:

cd orbitXAI\backend

Create/activate the Conda environment:

conda activate orbitxai

If the environment does not exist, create it:

conda create -n orbitxai python=3.11 -y

Then activate:

conda activate orbitxai

Verify Python:

python --version

Expected:

Python 3.11.x
4️⃣ Install Backend Dependencies

From the backend directory:

python -m pip install --upgrade pip

Install the current backend dependencies:

python -m pip install fastapi "uvicorn[standard]" python-multipart pydantic-settings

Verify:

python -c "import fastapi, uvicorn, pydantic_settings; print('OrbitXAI backend dependencies OK')"

Expected:

OrbitXAI backend dependencies OK
5️⃣ Start the FastAPI Backend

From:

orbitXAI/backend

run:

uvicorn app.main:app --reload

Expected:

Uvicorn running on http://127.0.0.1:8000
6️⃣ Verify the Backend

Open:

API
http://localhost:8000

Expected response:

{
  "message": "OrbitXAI API",
  "status": "online",
  "version": "0.1.0"
}
Health Check

Open:

http://localhost:8000/health

Expected:

{
  "status": "ok",
  "service": "OrbitXAI API",
  "version": "0.1.0"
}
API Documentation

Open:

http://localhost:8000/docs

This opens the interactive Swagger UI.

7️⃣ Run Frontend + Backend Together

OrbitXAI requires two running servers during development.

Terminal 1 — Frontend
cd orbitXAI\frontend
npm run dev

Frontend:

http://localhost:3000
Terminal 2 — Backend
cd orbitXAI\backend
conda activate orbitxai
uvicorn app.main:app --reload

Backend:

http://localhost:8000
