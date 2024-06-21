

function Test() {

  let a = 10000;

  console.log(a.toString().padStart(10, '0'))

  function crc16_ccitt(data) {
    // Tham số CRC-16-CCITT
    const polynomial = 0x1021;
    let crc = 0xFFFF;

    // Chuyển đổi chuỗi đầu vào thành bytes
    const bytesData = new TextEncoder().encode(data);

    // Xử lý từng byte
    for (let byte of bytesData) {
        crc ^= byte << 8;
        for (let i = 0; i < 8; i++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ polynomial;
            } else {
                crc <<= 1;
            }
            crc &= 0xFFFF; // Đảm bảo CRC vẫn là giá trị 16-bit
        }
    }

    // Trả về CRC dưới dạng chuỗi thập lục phân
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  let input = "00020101021138620010A00000072701320006970454011899MM24531M818986280208QRIBFTTA530370454065000005802VN62420515MOMOW2W818986280819Thanh toán đơn hàng80039996304"
  console.log(crc16_ccitt(input))

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

export default Test;