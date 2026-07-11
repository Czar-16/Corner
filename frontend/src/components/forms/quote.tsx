// export const Quote = () => {
//   return (
//     <div className="bg-gray-800 text-white h-screen flex justify-center flex-col text-center max-w-md">
//       "The customer service i received was exceptional. The support team went
//       above and beyond to address mt concrens."
//     </div>
//   );
// };

// // quote.tsx
// export const Quote = () => {
//   return (
//     <div className="bg-zinc-950 text-white h-screen w-full flex justify-center items-center flex-col text-center px-8">
//       <p className="max-w-md text-2xl">
//         "The customer service I received was exceptional. The support team went
//         above and beyond to address my concerns."
//       </p>
//       <div className="mt-6">
//         <p className="text-sm max-w-md font-bold">Jules Winnfield</p>
//         <p className="text-sm max-w-md text-zinc-400">CEO, Acme Inc.</p>
//       </div>
//     </div>
//   );
// };

// components/forms/quote.tsx
export const Quote = () => {
  return (
    <div className="relative bg-[#000000] text-[#F2EFE9] h-screen w-full flex justify-center items-center flex-col text-center px-8 overflow-hidden">
      <span
        className="absolute -top-6 left-1/2 -translate-x-1/2 text-[220px] leading-none text-[#8A6C3F] select-none pointer-events-none"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        "
      </span>
      <p
        className="relative max-w-md text-2xl leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        "The clean interface helps me focus on what matters most—writing. It's
        the first platform that truly disappears behind the content."
      </p>
      <div className="relative mt-6">
        <p className="text-sm font-medium">Marcus Rivera</p>
        <p className="text-sm text-[#9C9891]">Tech Blogger</p>
      </div>
    </div>
  );
};
