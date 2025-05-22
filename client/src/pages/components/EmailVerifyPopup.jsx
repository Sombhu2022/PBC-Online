import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";



const EmailVerifyPopup = ({ email, onClose, onVerify }) => {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    toast.error("OTP expired. Please try logging in again.");
                    onClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp.trim()) {
            toast.error("Please enter the OTP");
            return;
        }
        await onVerify(otp);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[350px] shadow-xl relative">
                <h2 className="text-lg font-semibold mb-4 text-center">Email Verification</h2>
                <p className="text-sm text-gray-600 text-center mb-2">
                    Enter the OTP sent to <strong>{email}</strong>
                </p>
                <p className="text-sm text-center text-red-500 mb-4">
                    Time remaining: {formatTime(timeLeft)}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#1163b6] hover:bg-[#1164b6a1]">
                            Verify
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailVerifyPopup;
