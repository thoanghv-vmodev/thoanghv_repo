Angular overview & structure

# Install & Project structure

- Constructor là hàm tạo của một class, nó là một function đặc biệt mà khi bạn khởi tạo một instance của class thì nó sẽ được tự động chạy, và chỉ chạy duy nhất một lần

# Life cycle hooks :

- Móc vòng đời , cho phép chèn những tác vụ cần thiết trong những khoảng khắc quan trọng trong
  quá trình init cho đến khi destroy component.

- ngOnChanges(): khi Angular thiết lập các thuộc tính đầu vào và ràng buộc dữ liệu, gọi trước ngOnInit().

- ngOnInit(): khi component/directive được khởi tạo, gọi sau ngOnchanges().

- ngDoCheck(): Phát hiện 1 hành động thay đổi, ngay sau ngOnChanges() và ngOnInit().

- ngAfterContentInit(): Thực thi sau khi thêm nội dung bên ngoài vào view của component/ view mà directive đưa vào, sau ngOnDoCheck().

- ngAfterContentChecked(): Thực thi sau khi Angular đã kiểm tra nội dung bên ngoài đã được đưa vào view của component. Được gọi sau
  ngAfterContentInit() và mọi ngDoCheck() tiếp theo.

- ngAfterViewInit(): Thực thi sau khi Angular khởi tạo các view của component và các view con / view mà directive được đưa vào. Được gọi một
  lần sau ngAfterContentChecked() đầu tiên.

- ngAfterViewChecked(): Thực thi sau khi Angular kiểm tra các view của component và các view con /view mà directive được đưa vào. Được gọi sau
  ngAfterViewInit() và mọi ngAfterContentChecked() tiếp theo.

- ngOnDestroy(): Dọn dẹp ngay trước khi Angular phá hủy directive/component. Hủy đăng ký Observables và tách trình xử lý sự kiện để tránh rò
  rỉ bộ nhớ. Được gọi ngay trước khi Angular phá hủy directive/component.

# Component

Class, template metadata:

- Cấu trúc của một project Angular:
- angular.json là tập tin cấu hình cho Angular CLI -> chạy các dòng
- karma.config.js : file này dùng để chạy các testing (kiểm thử) các chức năng.
- package.json : file này chứa các thư viện cần thiết cho dự án angular, ngoài ra nếu ta thêm một thư viện bên thứ 3 vào thì khai
  báo trong này.
- environment: Chứa các option config cho môi trường. Mặc định, sẽ có một số môi tường phát triển tiêu chuẩn và production.
  có thể thêm một số config cho môi trường vào đây.

# app.module:

- declarations: Dùng để khai báo component, directive và pipe
- providers: Dùng để khai báo các service dùng trong toàn bộ các module của con.
- imports: Dùng để nạp các module cần sử dụng
- bootstrap: Định nghĩa component gốc của module, có thể là component bất kỳ, miễn là tất cả component con chạy vào component đó.

# Component metadata: selector, tempateUrl, template, styleUrl, providers.

- selector : Là tên được đặt để gọi một component trong code html. Ở ví dụ vừa rồi, từ khóa hello-ng-world được đặt tên cho component này. Khi cần gọi component này ra ở màn hình html cha, ta sẽ gọi bằng html tag <app-category-list></app-category-list>. Gọi như vậy thì component con sẽ được render ra component cha.

# Template:

- interpolation: là phép nội suy, render giá trị trong biến của component, cú pháp: {{}} vd: {{data.name}}.

- Property binding: thiết lập một thuộc tính element trong view. cú pháp: [] vd: <button [disabled]="buttonDisabled"></button>

- Event binding: dạng này sẽ kích hoạt event từ view sang component.View sẽ gửi dữ liệu từ 1 event,
  chẳng hạn khi ta click vào button để cập nhật giá trị trong component. Nó sẽ ngược so với property binding - từ component sang view.
  vd: <button (click)="updateName()">Update button</button>

- Two-way data binding: Dạng này thì luồng dữ liệu sẽ đi 2 chiều từ component sang view và ngược lại.
  Dạng này thường dùng trong form để cập nhật giá trị khi người dùng nhập vào.
  vd: [(ngModel)]

# Directive:

1. Components directives: selector component <component-name></component-name>.

2. Structural directives: structural directive thường có dấu '*' ở trước của directive: *ngFor, *ngIf, *ngSwitchCase...

3. Attribute directives: thuộc tính của đối tượng: \*ngStyle vd [directive]

- Built-in attribute directives: NgClass, NgStyle, NgModule.
