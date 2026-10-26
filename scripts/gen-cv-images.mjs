import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const OUT = '/home/z/my-project/public/images/cv';

const jobs = [
  { name: 'automotive-post.png', prompt: 'Professional automotive social media advertisement design, glossy black SUV in a modern car showroom with dramatic red and dark lighting, bold typography space " DRIVE YOUR DREAM", premium car dealer promo creative, high-end advertising layout, photorealistic, no watermark' },
  { name: 'print-products.png', prompt: 'Flat lay of custom printed merchandise products: branded mugs, t-shirts, phone cases, tote bags and business cards arranged neatly on a clean light background, printing shop product photography, soft studio lighting, professional e-commerce style, no text, no watermark' },
  { name: 'travel-visa.png', prompt: 'Clean professional travel visa consultancy social media design, airplane window view with passport and boarding pass on a bright sky blue background, modern minimal travel agency creative, optimistic mood, photorealistic, no watermark' },
];

async function main() {
  const zai = await ZAI.create();
  for (const job of jobs) {
    const outPath = `${OUT}/${job.name}`;
    if (fs.existsSync(outPath)) { console.log('SKIP', job.name); continue; }
    try {
      console.log('GEN', job.name);
      const res = await zai.images.generations.create({
        prompt: job.prompt, size: '1024x1024',
      });
      const b64 = res.data?.[0]?.base64;
      if (!b64) { console.log('EMPTY', job.name); continue; }
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      console.log('OK', job.name, Math.round(fs.statSync(outPath).size / 1024) + 'KB');
    } catch (e) {
      console.log('ERR', job.name, e.message);
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
