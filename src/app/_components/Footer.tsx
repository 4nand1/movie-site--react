import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#4338CA] py-10">
      <div className="max-w-7xl mx-auto flex justify-between items-start px-6 text-white">

      
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/Vector.png" className="w-5 h-5" />
            <img src="/Movie Z.png" className="h-5" />
          </div>

          <p className="text-sm opacity-90">© 2024 Movie Z. All Rights Reserved.</p>
        </div>

       
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-[16px]">Contact Information</p>

          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span className="text-sm">support@moviez.com</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span className="text-sm">+976 (11) 123-4567</span>
          </div>
        </div>

       
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-[16px]">Follow us</p>

          <div className="flex gap-4 text-sm">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Youtube</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
