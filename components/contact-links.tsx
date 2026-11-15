'use client';
import type {Settings} from '@/lib/data';
import {contactApps,contactHref,contactLogo} from '@/lib/contact-apps';
import {RasterLogo} from './tool-logo';
export default function ContactLinks({settings}:{settings:Settings}){return <div className="contact-brand-links" aria-label="Media sosial dan email">{contactApps(settings).filter(app=>app.published&&app.name.trim()).map(app=>{const href=contactHref(app);if(!href)return null;return <a key={app.id} className={'contact-brand-link '+(app.logo_url==='/logos/github.png'?'brand-github':'')} href={href} aria-label={app.name} title={app.name} target={app.kind==='email'?undefined:'_blank'} rel={app.kind==='email'?undefined:'noreferrer'}><RasterLogo src={contactLogo(app)} alt=""/></a>;})}</div>}
