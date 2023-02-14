function checkIsTokenExpired(): boolean {
  const token = localStorage.getItem("token");
  if (!token) {
    return true;
  } else {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}

interface DateTimeFormatOptions {
  formatMatcher?: "basic" | "best fit" | "best fit" | undefined;
  dateStyle?: "full" | "long" | "medium" | "short" | undefined;
  timeStyle?: "full" | "long" | "medium" | "short" | undefined;
  dayPeriod?: "narrow" | "short" | "long" | undefined;
  fractionalSecondDigits?: 1 | 2 | 3 | undefined;
}

function dateFormat(
  date: Date,
  format = "yyyy-mm-dd",
  options: DateTimeFormatOptions = {
    formatMatcher: "basic",
    dateStyle: "full",
    timeStyle: "full",
    dayPeriod: "narrow",
    fractionalSecondDigits: 2,
  }
) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (format === "yyyy-mm-dd") return [year, month, day].join("-");
  if (format === "dd-mm-yyyy") return [day, month, year].join("-");
  if (format === "toLocaleDateString")
    return d.toLocaleDateString("en-US", options);
  else throw new Error("The format couldn't be recognized");
}

export { checkIsTokenExpired, dateFormat };
