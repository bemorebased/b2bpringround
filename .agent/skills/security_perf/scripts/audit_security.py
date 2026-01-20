#!/usr/bin/env python3
import json
from pathlib import Path

def main():
    issues = []
    for file in Path(".").rglob("*.ts"):
        content = file.read_text()
        if "eval(" in content: issues.append({"file": str(file), "issue": "Potential eval injection"})
        if "process.env" not in content and "API" in content: issues.append({"file": str(file), "issue": "Missing env var safety"})

    print(json.dumps({"issues_found": len(issues), "details": issues or "All clear!"}))

if __name__ == "__main__":
    main()