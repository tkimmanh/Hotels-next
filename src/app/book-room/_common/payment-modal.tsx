"use client";
import { RoomsType } from "@/interfaces";
import { bookRoom } from "@/servers/hotels";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentModal = ({
  room,
  totalDays,
  totalAmount,
  checkInDate,
  checkOutDate,
  showPaymentModal,
  setShowPaymentModal,
}: {
  room: RoomsType;
  totalDays: number;
  totalAmount: number;
  checkInDate: string;
  checkOutDate: string;
  showPaymentModal: boolean;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        const bookingPayload = {
          hotel: room.hotel._id,
          room: room._id,
          checkInDate,
          checkOutDate,
          totalAmount,
          totalDays,
          paymentId: result.paymentIntent.id,
        };

        await bookRoom(bookingPayload);
        message.success("Room booked successfully");
        setShowPaymentModal(false);
        router.push("/user/bookings");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showPaymentModal}
      title="Complete Payment"
      onCancel={() => setShowPaymentModal(false)}
      footer={null}
    >
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{
              mode: "billing",
              allowedCountries: ["US"],
            }}
          />

          <div className="flex justify-end gap-5 mt-7">
            <Button
              disabled={loading}
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Pay ${totalAmount}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentModal;
