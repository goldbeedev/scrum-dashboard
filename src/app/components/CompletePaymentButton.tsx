import { formatAmountForDisplay } from "@/app/utils/stripe-helpers"


const CompletePaymentButton = (amount: number, currency: string, disabled: boolean) => (
    <button
          className="checkout-style-background"
          type="submit"
          disabled
        >
          Complete Payment {formatAmountForDisplay(amount, currency)}
    </button>
)

export default CompletePaymentButton