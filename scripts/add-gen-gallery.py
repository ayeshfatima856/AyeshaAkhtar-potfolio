import sqlite3
con = sqlite3.connect('/home/z/my-project/db/custom.db')
orvexa_id = con.execute("SELECT id FROM Brand WHERE name='Orvexa Marketing'").fetchone()[0]
items = [
    ("/images/gen/orvexa-identity.png", "Orvexa — brand identity concept", "Branding", "Sample concept for my own brand Orvexa Marketing.", True, orvexa_id),
    ("/images/gen/orvexa-post.png", "Orvexa — social media post sample", "Social Media Posts", "Sample post design for my own brand Orvexa Marketing.", True, orvexa_id),
    ("/images/gen/orvexa-ad.png", "Orvexa — ad creative sample", "Advertising Creatives", "Sample ad creative for my own brand Orvexa Marketing.", True, orvexa_id),
    ("/images/gen/food-biryani.png", "Biryani night — food promo sample", "Restaurant & Food", "Sample creative — designed as a style demo, not client-published work.", True, None),
    ("/images/gen/realestate-ad.png", "Property campaign — ad creative sample", "Real Estate", "Sample creative — designed as a style demo, not client-published work.", True, None),
    ("/images/gen/fashion-drop.png", "New drop — fashion story sample", "Fashion", "Sample creative — designed as a style demo, not client-published work.", True, None),
]
mx = con.execute("SELECT COALESCE(MAX(sort),0) FROM GalleryItem").fetchone()[0]
for i, (url, title, cat, cap, sample, bid) in enumerate(items):
    con.execute(
        "INSERT INTO GalleryItem (id, title, category, imageUrl, caption, isSample, projectId, brandId, sort, published, createdAt, updatedAt) "
        "VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, NULL, ?, ?, 1, datetime('now'), datetime('now'))",
        (title, cat, url, cap, 1 if sample else 0, bid, mx + i),
    )
con.commit()
print("total gallery:", con.execute("SELECT COUNT(*) FROM GalleryItem").fetchone()[0])
print("orvexa-linked:", con.execute("SELECT COUNT(*) FROM GalleryItem WHERE brandId IS NOT NULL").fetchone()[0])
