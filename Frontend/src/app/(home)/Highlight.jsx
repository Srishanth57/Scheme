// Highlight.jsx
import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

function Highlight() {
  return (
    <section className=" py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1000px] mx-auto flex justify-center gap-8 flex-wrap">
        <div className=" rounded-2xl shadow-lg shadow-black/10 w-[280px] h-[220px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-1.5">
          <div className="border rounded-xl p-6 w-[90%] h-[90%] flex flex-col justify-center items-center text-center gap-3">
            <GraduationCap className="text-[#0ea5e9] w-10 h-10" />
            <div>
              <h3 className="text-[1.8rem] m-0 text-gray-800 font-bold">1000+</h3>
              <p className="text-base m-0 text-gray-700"> Total Schemes</p>
            </div>
          </div>
        </div>
        <div className=" rounded-2xl shadow-lg shadow-black/10 w-[280px] h-[220px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-1.5">
          <div className=" border rounded-xl p-6 w-[90%] h-[90%] flex flex-col justify-center items-center text-center gap-3">
            <Users className="text-[#0ea5e9] w-10 h-10" />
            <div>
              <h3 className="text-[1.8rem] m-0 text-gray-800 font-bold">50+</h3>
              <p className="text-base m-0 text-gray-700">State Schemes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlight;