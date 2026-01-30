export async function fetchPayrollList() {
  const res = await fetch("/api/payroll", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch payroll list");
  return res.json();
}

export async function fetchPayrollDetail(payslipYearMonth) {
    const res = await fetch(`/api/payroll/${payslipYearMonth}`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch payroll detail");
    return res.json();
}