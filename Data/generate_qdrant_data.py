import os
import re
import json
from pathlib import Path

def parse_rules(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(
        r'---RULE_START:(?P<tag>[A-Z_0-9]+)---\s*(?P<text>.*?)\s*---RULE_END---',
        re.DOTALL
    )

    results = []

    for match in pattern.finditer(content):
        tag = match.group('tag')
        text = match.group('text').strip()

        parts = tag.split("_")
        if len(parts) < 3:
            continue  # Skip invalid tags

        zone = parts[0]
        rule_id = parts[1]
        category = "_".join(parts[2:])

        rule_entry = {
            "page_content": text,
            "metadata": {
                "zone": zone,
                "rule_id": rule_id,
                "category": category
            }
        }

        results.append(rule_entry)

    return results

def process_all_files():
    base_dir = Path.cwd() / "Data"
    input_folder = base_dir / "text_data_format"
    output_folder = base_dir / "data_for_qdrant"

    if not input_folder.exists():
        print(f"❌ Input folder not found: {input_folder}")
        return

    output_folder.mkdir(parents=True, exist_ok=True)

    file_count = 0
    for file_path in input_folder.glob("*.txt"):
        rules = parse_rules(file_path)
        if not rules:
            print(f"⚠️ No valid rules found in: {file_path.name}")
            continue

        output_file = output_folder / f"{file_path.stem}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(rules, f, indent=2, ensure_ascii=False)

        print(f"✅ Processed: {file_path.name} → {output_file.name}")
        file_count += 1

    print(f"\n✅ Total files processed: {file_count}")

if __name__ == "__main__":
    process_all_files()
