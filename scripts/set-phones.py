#!/usr/bin/env python3
"""Set Ayesha's real phone numbers on the Profile row (provided by owner, not fabricated)."""
import sqlite3

DB = "/home/z/my-project/db/custom.db"
PHONE1 = "96871756645"
PHONE2 = "03157982508"

con = sqlite3.connect(DB)
cur = con.cursor()
cols = [r[1] for r in cur.execute("PRAGMA table_info(Profile)").fetchall()]
for c in ("phone1", "phone2"):
    if c not in cols:
        raise SystemExit(f"column {c} missing — run `npx prisma db push` first")

cur.execute(
    "UPDATE Profile SET phone1 = ?, phone2 = ? WHERE id = (SELECT id FROM Profile LIMIT 1)",
    (PHONE1, PHONE2),
)
con.commit()
row = cur.execute("SELECT name, phone1, phone2 FROM Profile LIMIT 1").fetchone()
print("updated:", row)
con.close()
