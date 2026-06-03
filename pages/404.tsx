import type { AppProps } from 'next/app';
import Image from 'next/image';
import { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import AppContext from '../AppContext';
import { getTranslate } from '../helpers';

export default function ErrorPage({ Component }: AppProps) {
  const { lang } = useContext(AppContext);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl mx-auto px-6"
      >
        <div className="mb-8">
          <Image
            src="/images/404.svg"
            width={400}
            height={400}
            alt="404 Error"
            className="mx-auto drop-shadow-2xl"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          {getTranslate(lang, 'lost')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer">
              {getTranslate(lang, 'home')}
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
