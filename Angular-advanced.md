# ROUTING AND NAVIGATION

- AppModule được coi là 1 root và chứa các module con, để navigation đến các module và các component con thì sử dụng
  Angular routing.
- Define routers dùng cặp ngoặc { path: 'name', component: name-component} - đối với component.
  { path: 'name', loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule)} - đối với
  module children

- Thêm routers vào view:

# routerLink:

<a routerLink="/path" routerLinkActive="active"></a>
<a [routerLink]="['path', id]" routerLinkActive="active"></a>

- routerLinkActive là phần Css để biết link đang được sử dụng
- dùng RouterModule

# LazyLoad:

- Không load module các không cần thiết
- load nội dung mới mà không cần phải reload

vd: {
path: 'product-list',
loadChildren: () => import('./product/product-list/product-list.module').then(m => m.ProductListModule)
}

- PreloadAllModules tải trước các module khi rảnh(khi tải xong module cần sử dụng), việc này sẽ giúp user ko tốn tgian đợi load tiếp module khi navigation

# Route parameters:

- truyền tham số để render dữ liệu theo tham số truyền vào

# Routing guard:

- Dùng để chặn người dùng khi chưa đủ điều kiện để redirect qua page khác.

- CanActivate: Quyết định việc một route được kích hoạt.

- CanActivateChild: Quyết định việc một children route được kích hoạt.

- CanDeactivate: Quyết định một route hủy kích hoạt.

- CanLoad: Quyết định một module được lazy loading

- Resolve: Lấy data trước khi điều hướng tới route.

# ANGULAR (Service)

- Angular service luôn là Singleton.

# Dependency là: Sự phụ thuộc

- Khi trong class A có sự tồn tại của class B, dùng class B để làm một công việc nào đó, ta nói rằng class A đang phụ thuộc vào class B.

# Dependency injection:

- Dependency Injection là một phần quan trọng trong bộ core của Angular. Sử dụng cơ chế Dependency Injection giúp chúng ta có thể
  nhúng service vào các component hoặc các service với nhau.

# Singleton:

- Đảm bảo duy nhất một object được sinh ra trong toàn bộ hệ thống. Tức là giới hạn việc khởi tạo một class đối với một object.

# Angular (HttpClient)

- Http Client là một Service Module(\*) được cung cấp bởi Angular giúp chúng ta thực hiện những yêu cầu Http, dễ dàng custom các request
  option và handle error một cách dễ dàng.

- Error handling

# HTTP Request có các protocol:

- GET: Sử dụng để request data từ server.
- POST: Sử dụng khi gửi data tới server để tạo ra tài nguyên mới.
- PUT: Sử dụng để thay đổi thông tin của tài nguyên đã tồn tại trong hệ thống bằng cách sử dụng trong body của request.
- PATCH: Sử dụng để áp dụng sửa đổi 1 phần cho resource
- DELETE: Xóa một resource chỉ địn
- OPTION: Dùng để miêu tả các tùy chọn giao tiếp(HTTPs method) mà có thể dùng cho resource mục tiêu.

# What is Interceptor ? Chặn api lại để handling

- Interceptor trong Angular đc biết đến nhiều nhất là $http. Đây là service giúp ta có thể thao tác với backend và tạo ra các HTTP request.
  Có những trường hợp mà ta muốn nắm bắt mọi request và handle nó trước khi gửi nó đến server hoặc nắm bắt các response từ server
  và handle nó trước khi hoàn tất các call.
- Các interceptions

* request : Method này được chạy trước khi gửi 1 request tới backend, developer có thể thay đổi các tham số config của request đó

* requestError : Đôi khi các request có thể gặp lỗi trong quá trình gửi đi, RequestError interceptor sẽ bắt các lỗi này để show ra
  lý do cho developer để có thể sửa .

* response : Method được chạy ngay sau khi nhận được kết quả thành công từ request method.

* responseError : Khi gặp lỗi trong quá trình nhận responce , ResponseError interceptor sẽ bắt và hiển thị các lỗi cho developer.

# Introduct RxJS:

- Là một thư viện xử lý bất đồng bộ dựa trên event-based, nó cung cấp 1 kiểu lõi, Observable, kiểu satellite (Observer, Schedulers, Subjects)
  và các phương thưc làm việc với mảng(map, filter, reduce, every,..).
