from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pathlib import Path
root=Path(__file__).resolve().parents[1]
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
pdfmetrics.registerFont(TTFont('Body',font));pdfmetrics.registerFont(TTFont('Bold',bold))
output=root/'public/Ahmad_Fadhil_Naufal_CV.pdf'
c=canvas.Canvas(str(output),pagesize=A4)
c.setTitle('Ahmad Fadhil Naufal - Profil dan Portofolio')
c.setAuthor('Ahmad Fadhil Naufal')
w,h=A4
c.setFillColor(HexColor('#171023'));c.rect(0,h-182,w,182,fill=1,stroke=0)
c.setFillColor(HexColor('#b28bec'));c.setFont('Body',8);c.drawString(42,h-40,'PERSONAL PROFILE / PORTFOLIO')
c.setFont('Bold',24);c.setFillColor(HexColor('#f5f0fc'));c.drawString(42,h-80,'Ahmad Fadhil');c.drawString(42,h-111,'Naufal')
c.setFillColor(HexColor('#c2b4d1'));c.setFont('Body',9);c.drawString(42,h-140,'Mahasiswa  /  Web Developer  /  Creative')
c.drawImage(ImageReader(str(root/'public/images/profile.webp')),w-140,h-155,width=91,height=122,mask='auto',preserveAspectRatio=True)
y=h-218
style=ParagraphStyle('body',fontName='Body',fontSize=9,leading=15,textColor=HexColor('#524861'))
def para(text,y,size=9,width=None):
 st=ParagraphStyle('p',parent=style,fontSize=size,leading=size*1.65)
 p=Paragraph(text,st);pw,ph=p.wrap(width or w-84,600);p.drawOn(c,42,y-ph);return y-ph

def section(title,y):
 c.setFont('Bold',9);c.setFillColor(HexColor('#7850a6'));c.drawString(42,y,title)
 c.setStrokeColor(HexColor('#ddd4e6'));c.setLineWidth(.6);c.line(42,y-9,w-42,y-9)
 return y-24

y=section('PROFIL',y)
y=para('Mahasiswa yang tertarik pada pengembangan website, desain antarmuka, dan eksplorasi kreatif. Belajar melalui proyek personal dan akademik, dengan perhatian pada fungsi, pengalaman pengguna, dan kualitas visual.',y)-28
y=section('PROYEK & EKSPLORASI',y)
for title,desc in [
 ('JASAhub - Marketplace jasa digital','Katalog layanan, alur checkout QRIS, dan pengelolaan pesanan. Website: jasahub-three.vercel.app.'),
 ('FrRoutine - Rutinitas & produktivitas','Pengembangan aplikasi rutinitas dan jadwal kuliah dengan eksplorasi antarmuka liquid glass.'),
 ('MySPACE & FRGAMES - Eksplorasi desain','Konsep dashboard personal, pencatatan, dan platform mini-game dengan pendekatan mobile.'),
 ('Presentasi Pengantar Ilmu Lingkungan','Presentasi HTML interaktif mengenai ekosistem pesisir dan sumber daya energi.')]:
 c.setFont('Bold',9);c.setFillColor(HexColor('#21172e'));c.drawString(42,y,title);y=para(desc,y-10,8.5)-17

y-=6;y=section('BIDANG & ALAT YANG DIEKSPLORASI',y)
y=para('Web development, UI/UX, dan creative coding. Eksplorasi Next.js, React, TypeScript, Tailwind CSS, Supabase, Three.js, Motion, GitHub, dan Vercel.',y,8.5)-27
y=section('TAUTAN',y)
y=para('<b>GitHub:</b> github.com/WickyZer<br/><b>Portofolio:</b> portofolio-fadhil-livid.vercel.app',y,8.5)
c.linkURL('https://github.com/WickyZer',(42,y+14,w-42,y+29),relative=0)
c.linkURL('https://portofolio-fadhil-livid.vercel.app',(42,y-2,w-42,y+13),relative=0)
c.setFont('Body',7);c.setFillColor(HexColor('#9989a7'));c.drawString(42,30,'Ahmad Fadhil Naufal | Profil singkat dan pilihan proyek')
c.showPage();c.save();print(output)
