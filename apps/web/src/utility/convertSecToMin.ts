import moment from "moment";

export function convertSecondsMin(seconds: number) {
  const duration = moment.duration(seconds, "seconds");
  const minutes = Math.floor(duration.asMinutes());
  const remainingSeconds = duration.seconds();
  return `${minutes} min ${remainingSeconds} sec`;
}
