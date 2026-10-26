/**
 * Batch AI image generation for Ayesha Akhtar portfolio site.
 * Run with bun:  bun scripts/generate-images.mjs
 */
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'

const ROOT = '/home/z/my-project/public/images'

const JOBS = [
  // ---- 12 project thumbnails (landscape) ----
  { dir: 'projects', name: 'lumiere', size: '1344x768', prompt: 'Premium luxury fashion e-commerce website displayed on a sleek laptop screen, elegant beige and gold tones, silk fabric and perfume bottle beside the laptop, soft studio lighting, sophisticated editorial product photography, no readable text, no letters, high quality, detailed' },
  { dir: 'projects', name: 'pulseboard', size: '1344x768', prompt: 'Dark modern SaaS analytics dashboard interface on a widescreen monitor floating in dark studio, glowing electric purple and cyan charts, graphs and data cards, abstract UI blocks without readable text, futuristic tech aesthetic, volumetric glow, high quality render' },
  { dir: 'projects', name: 'havenkey', size: '1344x768', prompt: 'Modern real estate website on laptop and smartphone mockups, beautiful contemporary villa with pool in background at golden hour, clean minimal interface with property cards, warm professional photography style, no readable text, high quality' },
  { dir: 'projects', name: 'saffron', size: '1344x768', prompt: 'Elegant restaurant website displayed on a tablet standing on a dark wooden table, gourmet plated dish and smoky cocktail beside it, moody cinematic lighting with amber accents, dark premium aesthetic, no readable text, professional food photography, high quality' },
  { dir: 'projects', name: 'novawatt', size: '1344x768', prompt: 'Bold creative agency website on a curved desktop monitor in a neon-lit studio, vibrant purple and electric blue gradient 3D abstract shapes around, energetic futuristic atmosphere, abstract interface without readable text, high quality render' },
  { dir: 'projects', name: 'elena', size: '1344x768', prompt: 'Minimal editorial personal brand portfolio website on a laptop, soft beige studio scene with architecture magazine, dried pampas grass in vase, warm natural light, sophisticated feminine workspace aesthetic, no readable text, high quality photography' },
  { dir: 'projects', name: 'greenleaf', size: '1344x768', prompt: 'SEO growth analytics concept, rising line chart glowing on dark screen surrounded by fresh green leaves and botanical elements, organic eco brand aesthetic mixing nature and data, emerald and dark tones, no readable text, professional 3D render' },
  { dir: 'projects', name: 'fitfuel', size: '1344x768', prompt: 'Social media advertising campaign visual, smartphone showing colorful fitness app ads feed, dumbbell and protein shaker on vibrant blue and orange gradient background, energetic dynamic composition, abstract interface blocks without readable text, high quality' },
  { dir: 'projects', name: 'cloudsprint', size: '1344x768', prompt: 'Digital advertising performance dashboard on floating screens, colorful conversion funnel and growth charts glowing in dark navy space, green upward arrows and coins symbols, abstract data visualization without readable text, premium tech render' },
  { dir: 'projects', name: 'wanderly', size: '1344x768', prompt: 'Travel social media campaign flat lay, smartphone surrounded by passport, sunglasses, mini airplane model and palm leaf on gradient sunset background, Instagram style aesthetic, warm vibrant colors, abstract content cards without readable text, high quality photography' },
  { dir: 'projects', name: 'bloom', size: '1344x768', prompt: 'Brand identity design flat lay, business cards notebooks and logo sketches in violet purple and white, elegant stationery mockup on textured paper background, top view studio photography, soft shadows, no readable text, high quality' },
  { dir: 'projects', name: 'leadflow', size: '1344x768', prompt: 'High converting landing page on laptop with glowing call to action button, funnel visualization with user icons flowing down into conversion target, electric purple and cyan gradient dark background, abstract interface without readable text, premium 3D render' },

  // ---- 5 blog covers ----
  { dir: 'blog', name: 'seo-checklist', size: '1344x768', prompt: 'Abstract SEO concept illustration, glowing magnifying glass over website wireframe with rising ranking steps, dark navy background with purple and cyan gradient light, 3D render style, no readable text, high quality' },
  { dir: 'blog', name: 'meta-vs-google', size: '1344x768', prompt: 'Two glowing holographic panels facing each other connected by energy stream, one blue one purple, representing digital advertising platforms comparison, dark background with dramatic lighting, abstract 3D render, no readable text, high quality' },
  { dir: 'blog', name: 'landing-hero', size: '1344x768', prompt: 'Website landing page wireframe transforming into polished interface, glowing conversion button, cursor arrow clicking, dark studio with electric purple and blue gradient lighting, 3D render, no readable text, high quality' },
  { dir: 'blog', name: 'content-calendar', size: '1344x768', prompt: 'Colorful content planning concept, floating calendar cards and social media post thumbnails arranged in orbit around glowing smartphone, playful vibrant gradient background, 3D illustration style, no readable text, high quality' },
  { dir: 'blog', name: 'design-trends', size: '1344x768', prompt: 'Futuristic web design workspace, glass morphism UI panels floating in 3D space with gradient meshes and elegant typography shapes, dark navy and violet palette, premium abstract render, no readable text, high quality' },

  // ---- site visuals ----
  { dir: 'site', name: 'webdev-feature', size: '1344x768', prompt: 'Sleek code editor on widescreen monitor with colorful syntax, website being built floating beside it, dark room lit by electric purple and blue RGB glow, abstract code without readable text, premium tech photography, high quality' },
  { dir: 'site', name: 'marketing-feature', size: '1344x768', prompt: 'Digital marketing command center, multiple floating transparent screens with colorful charts graphs and engagement metrics, dark navy environment with vibrant purple cyan and orange glow, abstract data without readable text, premium 3D render, high quality' },
  { dir: 'site', name: 'og-banner', size: '1440x704', prompt: 'Premium abstract brand banner, flowing gradient waves of electric purple blue and cyan on dark navy background, subtle geometric grid lines and glowing particles, elegant minimal tech aesthetic, no text, high quality render' },
  { dir: 'site', name: 'cta-texture', size: '1440x704', prompt: 'Abstract premium background texture, deep dark navy silk waves with subtle electric purple and blue light streaks, elegant minimal, soft glowing particles, no text, high quality render' },
  { dir: 'site', name: 'workspace', size: '1344x768', prompt: 'Aesthetic modern workspace desk from above, laptop with colorful design software, notebook with wireframe sketches, coffee cup, plant, warm ambient purple and blue LED strip lighting in dark room, cozy creative atmosphere, no readable text, high quality photography' },
]

async function main() {
  const zai = await ZAI.create()
  const only = process.argv[2] // optional filter substring
  const jobs = only ? JOBS.filter(j => j.name.includes(only)) : JOBS

  let done = 0, failed = 0
  const CONCURRENCY = 4
  const queue = [...jobs]

  async function worker(id) {
    while (queue.length) {
      const job = queue.shift()
      const outDir = path.join(ROOT, job.dir)
      fs.mkdirSync(outDir, { recursive: true })
      const out = path.join(outDir, `${job.name}.png`)
      if (fs.existsSync(out) && fs.statSync(out).size > 20000) { done++; continue }
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await zai.images.generations.create({ prompt: job.prompt, size: job.size })
          const b64 = res?.data?.[0]?.base64
          if (!b64) throw new Error('empty response')
          fs.writeFileSync(out, Buffer.from(b64, 'base64'))
          done++
          console.log(`[ok] ${job.dir}/${job.name}.png (${done}/${jobs.length})`)
          break
        } catch (e) {
          console.error(`[err] ${job.name} attempt ${attempt}: ${e.message}`)
          if (attempt === 3) failed++
          else await new Promise(r => setTimeout(r, 1500 * attempt))
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)))
  console.log(`DONE generated=${done} failed=${failed}`)
}

main().catch(e => { console.error('FATAL', e); process.exit(1) })
