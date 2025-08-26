# This file generates the file which is required by RAGAS tool to evaluate the performance of the system

import json
import os
import re

# Paths to your files
data_dir = "Data/data_for_qdrant"
files = ["primary_functional_rooms.json"]

eval_data = []

# Map categories to question templates
category_to_question = {
    "PLACEMENT": "Where should the {zone} be located?",
    "PROHIBITED_DIRECTIONS": "What must be avoided for the {zone}?",
    "REMEDIAL_ACTIONS": "What remedies exist if the {zone} is obstructed or wrongly placed?",
    "GENERAL": "Give vastu rules for the {zone}."
}

def clean_and_shorten(text, max_sentences=3):
    """Remove markdown, keep only first few sentences."""
    # Remove markdown bold/italics
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\*(.*?)\*", r"\1", text)

    # Split into sentences (basic split on . ? !)
    sentences = re.split(r'(?<=[.?!])\s+', text.strip())
    shortened = " ".join(sentences[:max_sentences])
    return shortened

for fname in files:
    path = os.path.join(data_dir, fname)
    with open(path, "r", encoding="utf-8") as f:
        rules = json.load(f)

    for rule in rules:
        zone = rule["metadata"].get("zone", "this area")
        category = rule["metadata"].get("category", "GENERAL")

        # Create query using metadata
        question_template = category_to_question.get(category, "What are vastu rules for the {zone}?")
        question = question_template.format(zone=zone.capitalize())

        # Ground truth = shortened page content
        ground_truth = clean_and_shorten(rule["page_content"], max_sentences=3)

        eval_data.append({
            "question": question,
            "ground_truth": ground_truth,
            "zone": zone,
            "category": category
        })

# Save as eval.json
out_path = "Data/eval.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(eval_data, f, indent=2, ensure_ascii=False)

print(f"✅ Generated {len(eval_data)} evaluation samples at {out_path}")














