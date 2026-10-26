import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync } from 'fs';

const IMAGES = {
  'emirates-hero':   'Cinematic wide shot of a modern commercial airplane tail fin with red accents against dramatic golden sunset sky above clouds, ultra realistic airline photography, premium travel brand aesthetic, no text no logos',
  'emirates-cabin':  'Luxurious airplane business class cabin interior with cream leather seats and warm ambient lighting, ultra realistic airline photography, premium elegant, no text no logos',
  'fatima-hero':     'Modern private hospital building exterior with glass facade and green landscaping, bright daylight, ultra realistic architectural photography, clean professional healthcare aesthetic, no text no logos',
  'fatima-team':     'Professional team of diverse doctors and nurses in scrubs and white coats smiling in bright modern hospital corridor, ultra realistic healthcare photography, no text no logos',
  'nova-airpods':    'Premium white wireless earbuds floating on minimalist light grey studio background with soft shadow, apple style product photography, ultra clean, no text no logos',
  'nova-macbook':    'Sleek thin silver laptop slightly open at an angle on minimalist white studio surface, dramatic soft lighting, apple style product photography, no text no logos',
  'aurelia-hero':    'High fashion editorial photo of elegant female model in flowing camel beige trench coat walking city street, autumn tones, cinematic vogue magazine style, no text no logos',
  'aurelia-rack':    'Minimalist luxury boutique clothing rack with neutral tone garments on wooden hangers, warm boutique lighting, editorial retail photography, no text no logos',
  'brewberry-hero':  'Cozy modern coffee shop interior with warm wood tones, barista counter, hanging Edison bulbs and lush plants, cinematic cafe photography, no text no logos',
  'brewberry-latte': 'Close up of perfect latte art rosetta in ceramic cup on rustic wooden table with coffee beans scattered, warm moody light, ultra realistic, no text no logos',
  'nestsky-villa':   'Stunning modern luxury villa with infinity pool at golden hour, palm trees, warm interior lights glowing, architectural digest photography, no text no logos',
  'nestsky-interior':'Bright airy scandinavian living room interior with linen sofa, large windows with ocean view, minimal warm decor, architectural photography, no text no logos',
};

async function main() {
  const filter = process.argv[2];
  const zai = await ZAI.create();
  const entries = Object.entries(IMAGES).filter(([k]) => !filter || k.includes(filter));
  let done = 0, failed = [];
  const worker = async ([name, prompt]) => {
    for (let a = 1; a <= 3; a++) {
      try {
        const r = await zai.images.generations.create({ prompt, size: '1216x704' });
        const b64 = r.data?.[0]?.base64 || r.images?.[0];
        if (!b64) throw new Error('no image');
        writeFileSync(`/home/z/my-project/public/images/demo/${name}.png`, Buffer.from(b64, 'base64'));
        done++; console.log(`OK ${name} (${done}/${entries.length})`);
        return;
      } catch (e) { console.log(`retry${a} ${name}: ${String(e).slice(0, 90)}`); await new Promise(r => setTimeout(r, 2500 * a)); }
    }
    failed.push(name);
  };
  const queue = [...entries]; const runners = Array.from({ length: 4 }, async () => { while (queue.length) { const item = queue.shift(); if (item) await worker(item); } });
  await Promise.all(runners);
  console.log('FINISHED', { done, failed });
}
main().catch(e => { console.error(e); process.exit(1); });
