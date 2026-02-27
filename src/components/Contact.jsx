import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BiLogoGmail } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5'
import { IoMdMail } from "react-icons/io"
import { FaPhone } from "react-icons/fa6"

const socials = [
  { Icon: BiLogoGmail, link: "mailto:theavdeshjadon@gmail.com" },
  { Icon: IoLogoLinkedin, link: "https://linkedin.com/in/avdeshjadon" },
  { Icon: IoLogoTwitter, link: "https://x.com/AvdeshJado26477" },
  { Icon: BsGithub, link: "https://github.com/avdeshjadon" }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const anim = (props) => ({ initial: { opacity: 0, ...props }, animate: isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } })

  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "832b2d27-3b6e-4754-94c9-cff3fd5e50fb");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Message sent! I'll get back to you soon.");
      event.target.reset();
      setTimeout(() => setResult(''), 5000); // clear success msg after 5 secs
    } else {
      setResult("Oops! Something went wrong.");
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div ref={ref} {...anim({})} className='lg:my-16 lg:px-28 my-8 px-5' id='contact'>
      <motion.h2 {...anim({ y: -50 })} className='text-2xl lg:text-3xl text-center font-light'>Contact <span className='font-medium'>Me</span></motion.h2>
      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row'>
        <motion.div {...anim({ x: -50 })} className='lg:w-[40%]'>
          <form onSubmit={onSubmit} className='w-full space-y-3 lg:space-y-5'>
            <input name="name" className='border px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full font-light' type="text" placeholder='Your name' required />
            <input name="email" className='border px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full font-light' type="email" placeholder='Email' required />
            <input name="website" className='border px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full font-light' type="text" placeholder='Your website (If exists)' />
            <textarea name="message" className='resize-none border px-5 py-3 h-32 border-black placeholder:text-[#71717A] rounded text-sm w-full font-light' placeholder='How can I help?*' required />
            
            {result && (
              <p className={`text-sm ${result.includes('Message sent') ? 'text-green-600' : (result === 'Sending....' ? 'text-gray-500' : 'text-red-500')}`}>
                {result}
              </p>
            )}

            <div className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'>
              <motion.button 
                whileHover={!isSubmitting ? { scale: 1.05 } : {}} 
                type='submit' 
                disabled={isSubmitting}
                className='bg-black justify-center w-fit lg:w-auto lg:flex-1 hover:shadow-lg text-white px-3 py-2 rounded flex items-center gap-x-3 font-normal disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Sending...' : 'Get In Touch'}
              </motion.button>
              <div className='flex items-center gap-x-2 lg:gap-x-5'>
                {socials.map(({ Icon, link }, i) => (
                  <motion.a key={i} href={link} target="_blank" rel="noopener noreferrer" className="bg-white p-2 lg:p-3 rounded border border-black" whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }} whileTap={{ scale: 0.9 }}>
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
        <motion.div {...anim({ x: 50 })} className='lg:w-1/2'>
          <div className='font-medium text-2xl lg:text-4xl mt-5 lg:mt-0 space-y-1 lg:space-y-3'>
            <h2>Let's <span className='text-white' style={{ WebkitTextStroke: '1px black' }}>talk</span> for</h2>
            <h2>Something special</h2>
          </div>
          <p className='text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6 font-light'>I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.</p>
          <div className='font-normal text-sm lg:text-lg flex flex-col mt-6 gap-2 lg:gap-4'>
            <motion.a whileHover={{ x: 5 }} className='flex items-center gap-2 group' href="mailto:theavdeshjadon@gmail.com">
              <span className='border transition-all border-transparent group-hover:border-black rounded-full p-1'><IoMdMail className="w-4 h-4 lg:w-5 lg:h-5" /></span>theavdeshjadon@gmail.com
            </motion.a>
            <motion.a whileHover={{ x: 5 }} className='flex items-center gap-2 group' href="tel:6201979695">
              <span className='border transition-all border-transparent group-hover:border-black rounded-full p-[5px]'><FaPhone className="w-3 h-3 lg:w-4 lg:h-4" /></span>+91 6201979695
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
