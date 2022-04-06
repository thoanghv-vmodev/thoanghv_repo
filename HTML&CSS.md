# HTML

1. Sematic HTML:

- Là cách viết HTML mà sử dụng các thẻ HTML ứng với nội dung được chứa trong nó(Yếu tố ngữ nghĩa).

VD:

- "article" Yếu tố "article" được sử dụng cho các nội dung độc lập và chứa nội dung của riêng nó.

- "section" Yếu tố "section" đại diện cho một phần chung có trong tài liệu hoặc ứng dụng,
  một section là một nhóm các nội dung có cùng chủ đề.

- "aside"
- "details"
- "figcaption"
- "figure"
- "footer"
- "header"
- "main"
- "mark"
- "nav"
- "summary"
- "time"

- Ví dụ về một vài semantic element trong HTML bao gồm: <a>, <form>, <table>, <img>, <h1> -> <h6>,...

2. HTML Accessibility:

- Accessible Rich Internet Applications (ARIA) là một bộ thuộc tính HTML giúp xác định nội dung ứng dụng và
  web giúp tăng khả năng truy cập với người khuyết tật. Lấy ví dụ, ARIA cho phép truy cập vào menu, các widget Javascript,
  các hướng dẫn sử dụng form và thông báo lỗi,…

3. HTML tree DOM:

- Đối với HTML DOM, cấu trúc dạng cây gọi là DOM Tree có nghĩa là mọi thành phần đều được xem là 1 nút (node), được biểu diễn trên 1 cây.
  Các phần tử khác nhau sẽ được phân loại nút khác nhau nhưng quan trọng nhất là 3 loại: nút gốc (document node), nút phần tử (element node), nút văn bản (text node).

# CSS:

- CSS Selector là thứ cho phép bạn nhắm mục tiêu tới các phần tử HTML để áp dụng các thuộc tính CSS cho chúng.
  CSS Selector giống như là đường đẫn, chỉ định để cho CSS biết bạn đang muốn điều chỉnh, tạo kiểu cho phần tử HTML nào vậy.
  "thẻ tag là Element Selector".

- SASS:
- SASS (Syntactically Awesome StyleSheets) là một CSS Preprocessor giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn. Với SASS, bạn có
  thể viết CSS theo thứ tự rõ ràng, quản lý các biến đã được định nghĩa sẵn, các class dùng chung hay có thể tự động nén tập tin CSS lại để bạn tiết kiệm dung lượng.

- CSS Grid:
  là một hệ thống bố cục dựa trên lưới 2 chiều nhằm mục đích thiết kế giao diện người dùng dựa trên lưới. Bố cục Grid phù hợp để thiết kế các website có độ phức tạp cao. display : grid tạo lưới cấp khối (block level).

- Flexbox Layout (hay còn gọi là Flexible Box):
  là một kiểu bố cục trang có khả năng tự cân đối kích thước, thay đổi chiều rộng/chiều cao và thứ tự phần tử bên trong để phù hợp với tất cả các loại thiết bị hiển thị và kích thước màn hình.

- Atomic CSS(Css nguyên tử - nghĩa là chia nhỏ):
  hiểu ngắn gọn là một cách viết CSS mà chúng ta không cần viết một dòng CSS nào cả. Tức là không cần phải
  define trong CSS source nữa, chỉ cần reuse nhưng thuộc tính đã khai báo trước đó là xong. Thay vì viết code CSS, chúng ta sẽ sử dụng các class có sẵn mà một Atomic CSS Framework cung cấp.
- Responsive Web Design:
  là xu hướng mới theo đó quy trình thiết kế và phát triển web sẽ đáp ứng mọi thiết bị và môi trường của người
  dùng theo các tiêu chí kích thước và chiều của màn hình thiết bị.

# CSR và SSR:

SSR:

- Server side rendering hay SSR là cách thông thường cho việc render trang web ở trình duyệt. Như các bước mô tả bên dưới cách truyền
  thống để rendering nội dung web như các bước dưới đây :

- 1.Người dùng gửi một yêu cầu tới website( Thông thường thông qua trình duyệt).
- 2.Phía server kiểm tra và chuẩn bị nội dung HTML sau khi đã đi qua một lượt các script có trong trang web.
- 3.Các đoạn HTML đã được biên dịch được gửi tới trình duyệt của người dùng cho việc render.
- 4.Trình duyệt tải về HTML và làm các trang có thể nhìn thấy với người dùng.
- 5.Trình duyệt sau đó tải về Javasciprt(JS) và tiến hành thực thi JS, nó làm cho trang web có thể tương tác.

CSR:

- Client side rendering là một cách tiếp cận khác về việc làm thế nào một trang web được xử lí để hiển thị trên trình duyệt.
  Ở CSR, gánh nặng về việc biên dịch nội dung, sinh ra HTML được chuyển tới phía trình duyệt người dùng.

- Cách tiếp cận này được tiếp sức mạnh từ các framework Javascript và các thư viện.
  Luồng chính của một trang web render trong trường hợp Client-side rendering như sau:

- 1.Người dùng gửi request tới webiste
- 2.Thay vì một server, một con CDN có thể được sử dụng để gửi HTML, CSS và các file hỗ trợ cho người dùng.
- 3.Trình duyệt tải HTML và JS trong khi nhìn thấy một biểu tượng loading
- 4.Sau khi trình duyệt lấy JS về, nó sẽ tạo các yêu cầu API thông qua Ajax và lấy về các nội dung động và xử lí chúng để render ra
  nội dung cuối cùng.
- 5.Sau khi server phản hồi, nội dung cuối cùng sẽ được render sử dụng quá trình xử lí DOM trên trình duyệt người dùng.

# JavaScript

- Rest: phần còn lại, làm tham số của 1 hàm.
- Spread: Gộp phần tử của mảng lại thành 1 mảng.

- Lan truyền sự kiện (Event Propagation) là một cơ chế xác định cách các sự kiện lan truyền hoặc di chuyển qua cây DOM để đến mục
  tiêu của nó và điều gì xảy ra với nó sau đó.

- Trong giai đoạn bubbling, quá trình sự kiện kích hoạt ngược lại. Nếu capturing thực hiện từ ngoài vào trong thì bubbling thực hiện từ
  trong ra ngoài.

- This trong JavaScript đề cập đến đối tượng mà nó thuộc về

- Primitive Types & Reference Types (Tham trị, tham chiếu)

- The event loop.

1. khi một hàm được gọi trong JS, hàm đó được thêm vào 1 vùng nhớ được gọi là call stack,
   Call stack là một phần của JS Engine không phải của Browser. sd cơ chế FILO (first in last out)

2. Các hàm bất đồng bộ sẽ được đưa vào web API để xử lý (setTimeout, setInterval).
   các hàm callback được truyền vào lúc này sẽ không nhảy qua Call Stack ngay mà nó được chuyển vào một hàng đợi Queue chờ được gọi lại.

3. Event Loop có một nhiệm vụ duy nhất là đồng bộ Queue với Call Stack,
   Nếu Call Stack trống thì chúng ta gọi hàm trong Queue, Queue hoạt động theo cơ chế FIFO nên hàm nào nằm trong hàng đợi trước thì được gọi thực thi trong Call Stack trước.

- SPA:
- Single Page Application:

- Single page Application là một ứng dụng web giúp nâng cao trải nghiệm người dùng bằng cách sử dụng HTML5 và AJAX,
  Đầu tiên khi tải một trang web bất kỳ, SPA sẽ tải một trang HTML đơn, sau đó dựa trên request của người dùng, SPA sẽ tiếp tục tải các HTML khác trong cùng một trang đó.
- Khi duyệt web sẽ gửi 1 request lên server.
- Server trả về HTML, CSS , JS thuần
- Gửi request AJAX yêu cầu chuyển trang
- Trả về JSON, HTML, Chỉ dữ liệu cần thiết của trang đó.
  => như vậy mỗi khi gửi request server sẽ không phải trả về toàn bộ HTML CSS JS của trang web nữa, mà trả về những gì request, bỏ qua được việc render lại trang web.

# Shallow copy vs Deep copy:

- shallow copy có nghĩa là một số giá trị sẽ vẫn kết nối với bản gốc.
  vd: let a = 10, let b = a => shallow coppy.

- deep coppy: Một bản deep copy nghĩa là toàn bộ giá trị được gán vào biến sẽ được sao chéo và tách rời hoàn toàn với bản gốc

# Web Api là gì:

- Web API(ở trình duyệt 'bowser') là phương thức dùng để cho phép các ứng dụng khác nhau có thể giao tiếp, tra đổi dữ liệu qua lại.
  Dữ liệu được Web API trả lại thường ở dạng JSON hoặc XML thông qua giao thức HTTP hoặc HTTPS.

# Mảng là từ object.
