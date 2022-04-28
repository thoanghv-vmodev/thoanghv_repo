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

- Angular service là Singleton.

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

- Error handling: cath api rồi kiểm tra lỗi, rồi thông báo.

# HTTP Request có các protocol:

- GET: Sử dụng để request data từ server.
- POST: Sử dụng khi gửi data tới server để tạo ra tài nguyên mới.
- PUT: Sử dụng để thay đổi thông tin của tài nguyên đã tồn tại trong hệ thống bằng cách sử dụng trong body của request.
- PATCH: Sử dụng để áp dụng sửa đổi 1 phần cho resource
- DELETE: Xóa một resource chỉ định
- OPTION: Dùng để miêu tả các tùy chọn giao tiếp(HTTPs method) mà có thể dùng cho resource mục tiêu.

# What is Interceptor ? Chặn request/response lại để handling

- Interceptor trong Angular đc biết đến nhiều nhất là $http. Đây là service giúp ta có thể thao tác với backend và tạo ra các HTTP request.
  Có những trường hợp mà ta muốn nắm bắt mọi request và handle nó trước khi gửi nó đến server hoặc nắm bắt các response từ server
  và handle nó trước khi hoàn tất các call.
- Các interceptions:

* request : Method này được chạy trước khi gửi 1 request tới backend, developer có thể thay đổi các tham số config của request đó

* requestError : Đôi khi các request có thể gặp lỗi trong quá trình gửi đi, RequestError interceptor sẽ bắt các lỗi này để show ra
  lý do cho developer để có thể sửa .

* response : Method được chạy ngay sau khi nhận được kết quả thành công từ request method.

* responseError : Khi gặp lỗi trong quá trình nhận response , ResponseError interceptor sẽ bắt và hiển thị các lỗi cho developer.

# Angular Form:

# Template Driven Forms Features: Template-driven Forms

- Template-driven Forms: Cơ chế hoạt động của dạng forms này sẽ chủ yếu dựa vào các directives trên template như NgForm, NgModel, required,
  etc; để làm việc. Form dạng này sử dụng Two-way binding để update data model giữa template và component.
  - Sử dụng Template variables :#itemForm="ngForm"

* Easy to use
* Suitable for simple scenarios and fails for complex scenarios - Sử dụng các trg hợp đơn giản, ko thích hợp vs trường hợp phức tạp
* Similar to AngularJS - giống angularjs
* Two way data binding(using [(NgModel)] syntax)
* Minimal component code - ít component
* Automatic track of the form and its data(handled by Angular) - Tự động theo dõi dữ liệu
* Unit testing is another challenge

# Reactive Forms Features: Model-driven Forms

- Reactive Forms: Chúng ta sẽ xây dựng form từ các model, là các object có một số chức năng đặc biệt để quản lý được các form input.
  Nó cũng sử dụng một số (nhưng rất ít) các directives.

  - Để binding giữa form model và template lại với nhau, chúng ta sẽ dùng directive : [formGroup]="registerForm".

- More flexible, but needs a lot of practice: Linh hoạt hơn, nhưng cần luyện tập nhiều

- Handles any complex scenarios - Xử lý mọi tình huống phức tạp

- No data binding is done (immutable data model preferred by most developers)
  Không có ràng buộc dữ liệu nào được thực hiện (mô hình dữ liệu bất biến được hầu hết các nhà phát triển ưa thích)

- More component code and less HTML markup - ít viết trên html, dùng component để xử lý

- Reactive transformations can be made possible such as - Có thể tùy biến như:

- Handling a event based on a debounce time - Xử lý một sự kiện dựa trên thời gian gỡ lỗi

- Handling events when the components are distinct until changed -
  Xử lý các event khi các component khác biệt cho đến khi thay đổi

* Adding elements dynamically - Thêm các yếu tố động

* Easier unit testing - dễ test

# AbstractControl: đây là base class của 3 thành ở dưới - chúng là các thành phần cơ bản của form.

- FormControl là đơn vị nhỏ nhất của một form, dùng để track thông tin về value, validation của một form control như là thông tin
  của một input, một checkbox, etc.
- FormGroup là một tập hợp của các control/group/array (AbstractControl) khác. Dạng như một Object, nó có thể chứa các value đơn lẻ,
  hoặc các Object khác.
- FormArray cấu trúc dạng mảng, để quản lý các AbstractControl theo dạng mảng, dùng cho trường hợp cấu trúc có thể thêm bớt phần tử
  một cách linh hoạt.

# Angular Forms Validation:

Validation status cho một control sẽ bao gồm các status sau:

- touched: true nếu người dùng đã focus vào control (như là input, textarea, etc) rồi sau đó blur khỏi control đó. Hoặc khi gọi markAsTouched.
- untouched: true nếu người dùng chưa đụng chạm gì đến control hoặc lần đầu tiên focus và chưa bị mất focus (ngược lại với touched)
- dirty: true nếu người dùng đã thay đổi value của control – nhập một ký tự vào input text chẳng hạn, kể cả việc nhập vào rồi xóa đi
  thì cũng tính là đã thay đổi.
- pristine: true nếu người dùng chưa thay đổi value của control, mặc dù có thể đã touched, nhưng chưa sửa đổi gì.

- Với mỗi validation status như trên chúng ta sẽ có các CSS class tương ứng cho control/form. Bạn hoàn toàn có thể style cho component
  dựa vàocác class này:

- .ng-valid
- .ng-invalid
- .ng-pending
- .ng-pristine
- .ng-dirty
- .ng-untouched
- .ng-touched

# Introduct RxJS:

- Là một thư viện xử lý bất đồng bộ dựa trên event-based, nó cung cấp 1 kiểu lõi, Observable, kiểu satellite (Observer, Schedulers, Subjects)
  và các phương thưc làm việc với mảng(map, filter, reduce, every,..).

1. Observable là gì:

- Observable: đại diện cho ý tưởng về một tập hợp các giá trị hoặc các sự kiện trong tương lai. Khi các giá trị hoặc sự kiện phát sinh  
  trong tương lai, Observable sẽ điều phối nó đến Observer.

- Là một function (class) mà nó có một số yêu cầu đặc biệt. Nó nhận đầu vào là 1 Func, mà Func này nhận input là một Observer và trả về một
  function để có thể thực hiện việc cancel quá trình xử lý. Thông thường (Rxjs 5) đặt tên function đó là unsubscribe.

2. Observer:

- một object chứa các phương thức next, error và complete để xử lý dữ liệu tương ứng với các signals được gửi từ Observeble.
- là một tập hợp các callbacks tương ứng cho việc lắng nghe các giá trị (next, error, hay complete) được gửi đến bởi Observable

3. Subscription:

- là kết quả có được sau khi thực hiện một Observable, nó thường dùng cho việc hủy việc tiếp tục xử lý.(unsubscribe)

4. Operators:

- là các pure(nguyên mẫu) functions cho phép lập trình functional với Observable.

4. Subject:

- để thực hiện việc gửi dữ liệu đến nhiều Observers (multicasting).

5. Schedulers:

- Một scheduler sẽ điều khiển khi nào một subscription bắt đầu thực thi, và khi nào sẽ gửi tín hiệu đi.
