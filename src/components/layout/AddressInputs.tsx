export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}: {
  addressProps: any;
  setAddressProp?: any;
  disabled?: boolean;
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone number</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setAddressProp("phone", e.target.value)}
      />
      <label>Street address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street address"
        value={streetAddress}
        onChange={(e) => setAddressProp("streetAddress", e.target.value)}
      />
      <div className="flex gap-2">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            style={{ margin: "0" }}
            type="text"
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setAddressProp("postalCode", e.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            style={{ margin: "0" }}
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setAddressProp("city", e.target.value)}
          />
        </div>
        <div>
          <label>Country</label>
          <input
            disabled={disabled}
            style={{ margin: "0" }}
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setAddressProp("country", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
