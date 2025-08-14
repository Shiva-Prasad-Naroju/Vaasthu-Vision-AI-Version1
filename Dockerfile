# Step 1: Lightweight Python base
FROM python:3.11-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy requirements first for caching
COPY requirements.txt .

# Step 4: Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of the code
COPY . .

# Step 6: Expose FastAPI port
EXPOSE 8000

# Step 7: Run FastAPI app
CMD ["uvicorn", "ui.app:app", "--host", "0.0.0.0", "--port", "8000"]
