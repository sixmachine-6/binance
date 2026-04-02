export default function TestOtpInfo() {
  const data = [
    { phone: "+91 93594 91952", otp: "456787" },
    { phone: "+91 84312 52624", otp: "789674" },
    { phone: "+91 90734 73194", otp: "897654" },
  ];

  return (
    <div className="bg-[#111827] text-white p-5 rounded-xl mt-6">
      <p className="text-yellow-400 text-sm mb-4">
        ⚠ Note: OTP sending is currently disabled because SMS verification is a
        paid feature. Please use the following test phone numbers and OTPs for
        login.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-2">Phone Number</th>
              <th className="text-left py-2">Verification Code</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2">{item.phone}</td>
                <td className="py-2">{item.otp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
