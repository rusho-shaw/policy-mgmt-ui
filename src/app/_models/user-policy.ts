export interface UserPolicy {
  policyNo: number;
  policy: UserPolicy;
  amountPaid: number;
  policyEndDate: Date;
  isValid: boolean;
}
