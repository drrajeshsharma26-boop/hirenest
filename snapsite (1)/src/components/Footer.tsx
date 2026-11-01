import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071536] text-white pt-16 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-4">
            <Logo light />
            <p className="text-sm text-slate-400 max-w-sm">
              Build skills. Get career-ready.
            </p>
          </div>

          {/* Explore links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#learning-modes" className="hover:text-white transition-colors">
                  Learning modes
                </a>
              </li>
              <li>
                <a href="#pathway" className="hover:text-white transition-colors">
                  Pathway
                </a>
              </li>
              <li>
                <a href="#success" className="hover:text-white transition-colors">
                  Student success
                </a>
              </li>
              <li>
                <a href="#transparency" className="hover:text-white transition-colors">
                  Trust &amp; Transparency
                </a>
              </li>
              <li>
                <a href="#career-prep" className="hover:text-white transition-colors">
                  Career prep
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              CONTACT &amp; OFFICE
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a
                  href="mailto:hirenestsolution@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>hirenestsolution@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918860670794"
                  className="hover:text-white transition-colors"
                >
                  +91 88606 70794
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918860670794?text=Hi%20Hire%20Nest%2C%20I%20want%20to%20enquire%20about%20your%20training%20programs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
              <li className="text-xs text-slate-400 pt-1 leading-relaxed">
                Office 303, B-44, Sector 63, Noida, Uttar Pradesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 Hire Nest. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex items-center gap-6 text-slate-500">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a
              href="#admin"
              onClick={() => {
                if (window.location.hash === '#admin') {
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
              className="text-slate-500 hover:text-slate-300 text-[11px] transition-colors"
              title="Hire Nest Staff Admissions & Leads Portal"
            >
              Staff Portal (Admissions Desk)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
