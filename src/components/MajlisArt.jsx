function MajlisArt() {
  return (
    <svg viewBox='0 0 400 460' aria-hidden='true'>
      <defs>
        <pattern id='sadu' width='28' height='28' patternUnits='userSpaceOnUse' patternTransform='translate(0 404)'>
          <rect width='28' height='28' fill='#9b1c23' />
          <rect width='28' height='3' fill='#1c1210' />
          <rect y='3' width='28' height='2' fill='#fffdf8' />
          <rect y='23' width='28' height='2' fill='#fffdf8' />
          <rect y='25' width='28' height='3' fill='#1c1210' />
          <path d='M14 7l7 7-7 7-7-7z' fill='#fffdf8' />
          <path d='M14 10.5l3.5 3.5-3.5 3.5-3.5-3.5z' fill='#1c1210' />
          <path d='M0 9.5l4.5 4.5L0 18.5zM28 9.5L23.5 14l4.5 4.5z' fill='#1c1210' />
        </pattern>
        <pattern id='sadu-small' width='28' height='28' patternUnits='userSpaceOnUse' patternTransform='translate(0 322) scale(0.715)'>
          <rect width='28' height='28' fill='#fffdf8' />
          <rect width='28' height='3' fill='#1c1210' />
          <rect y='25' width='28' height='3' fill='#1c1210' />
          <path d='M14 6l8 8-8 8-8-8z' fill='#9b1c23' />
          <path d='M14 10.5l3.5 3.5-3.5 3.5-3.5-3.5z' fill='#1c1210' />
          <path d='M0 9.5l4.5 4.5L0 18.5zM28 9.5L23.5 14l4.5 4.5z' fill='#1c1210' />
        </pattern>
        <pattern id='lattice' width='14' height='14' patternUnits='userSpaceOnUse'>
          <path d='M7 0l7 7-7 7-7-7z' fill='none' stroke='#eddcc4' strokeWidth='1.4' />
        </pattern>
        <clipPath id='inside-arch'>
          <path d='M26 444V210a174 174 0 0 1 348 0v234a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8z' />
        </clipPath>
      </defs>

      <path d='M10 444V210a190 190 0 0 1 380 0v234a16 16 0 0 1-16 16H26a16 16 0 0 1-16-16z' fill='#7a1219' />
      <path d='M18 446V210a182 182 0 0 1 364 0v236' fill='none' stroke='#c08a3e' strokeWidth='2' />

      <g clipPath='url(#inside-arch)'>
        <rect x='26' y='30' width='348' height='430' fill='#f3e3cc' />
        <rect x='26' y='262' width='348' height='150' fill='#ead5b8' />
        <rect x='26' y='258' width='348' height='5' fill='#c08a3e' />

        <path d='M152 236v-78a48 48 0 0 1 96 0v78z' fill='#5c3120' />
        <path d='M152 236v-78a48 48 0 0 1 96 0v78z' fill='url(#lattice)' />
        <path d='M152 236v-78a48 48 0 0 1 96 0v78z' fill='none' stroke='#2a1611' strokeWidth='5' />

        <path d='M104 58v62M296 58v62' stroke='#2a1611' strokeWidth='2' />
        <path d='M94 120h20l7 11v24l-7 11H94l-7-11v-24z' fill='#c08a3e' />
        <path d='M96 134h16v20H96z' fill='#fff3d6' />
        <path d='M286 120h20l7 11v24l-7 11h-20l-7-11v-24z' fill='#c08a3e' />
        <path d='M288 134h16v20h-16z' fill='#fff3d6' />

        <rect x='42' y='296' width='76' height='72' rx='14' fill='#9b1c23' />
        <rect x='122' y='296' width='76' height='72' rx='14' fill='#5c3120' />
        <rect x='202' y='296' width='76' height='72' rx='14' fill='#9b1c23' />
        <rect x='282' y='296' width='76' height='72' rx='14' fill='#5c3120' />
        <rect x='42' y='322' width='316' height='20' fill='url(#sadu-small)' />
        <path d='M120 300v64M200 300v64M280 300v64' stroke='#f3e3cc' strokeWidth='4' />

        <rect x='32' y='362' width='336' height='46' rx='12' fill='#7a1219' />
        <rect x='32' y='376' width='336' height='4' fill='#1c1210' />
        <rect x='32' y='382' width='336' height='3' fill='#fffdf8' />
        <rect x='32' y='387' width='336' height='4' fill='#c08a3e' />

        <rect x='26' y='404' width='348' height='56' fill='url(#sadu)' />
      </g>
    </svg>
  )
}

export default MajlisArt
