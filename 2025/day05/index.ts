// Script for day5 
export type ElfDateTime =
  `${number}*${number}*${number}@${number}|${number}|${number} NP`

export function timeUntilTakeOff(
  fromTime: ElfDateTime,
  takeOffTime: ElfDateTime
): number {
  // All your code here
  let formattedFrom = new Date(fromTime.replace('*', '-').replace('*', '-').replace('@', 'T').replace('|', ':').replace('|', ':').replace(' NP', 'Z'))
  let formattedTakeOff = new Date(takeOffTime.replace('*', '-').replace('*', '-').replace('@', 'T').replace('|', ':').replace('|', ':').replace(' NP', 'Z'))
  return Math.floor((formattedTakeOff.getTime() - formattedFrom.getTime())/(1000))
}

const takeoff = '2025*12*25@00|00|00 NP'

// desde el 24 diciembre 2025, 23:59:30, 30 segundos antes del despegue
timeUntilTakeOff('2025*12*24@23|59|30 NP', takeoff)
// 30

// justo en el momento exacto
timeUntilTakeOff('2025*12*25@00|00|00 NP', takeoff)
// 0

// 12 segundos después del despegue
timeUntilTakeOff('2025*12*25@00|00|12 NP', takeoff)
// -12