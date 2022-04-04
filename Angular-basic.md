Angular overview & structure

#Install & Project structure

#Life cycle hooks :

- Móc vòng đời , cho phép chèn những tác vụ cần thiết trong những khoảng khắc quan trọng trong
  quá trình init cho đến khi destroy component.

- ngOnChanges(): khi Angular thiết lập các thuộc tính đầu vào và ràng buộc dữ liệu, gọi trước ngOnInit.

- ngOnInit() : khi component/directive được khởi tạo, gọi sau ngOnchanges.

- ngDoCheck(): Phát hiện 1 hành động thay đổi, ngay sau ngOnChanges() và ngOnInit().

- ngAfterContentInit(): Thực thi sau khi thêm nội dung bên ngoài vào view của component/ view mà directive đưa vào, sau ngOnDoCheck.

- ngAfterContentChecked(): Thự thi sau khi Angular đã kiểm tra nội dung bên ngoài đã được đưa vào view của component. Được gọi sau
  ngAfterContentInit() và mọi ngDoCheck() tiếp theo.

- ngAfterViewInit(): hự thi sau khi Angular khởi tạo các view của component và các view con / view mà directive được đưa vào. Được gọi một
  lần sau ngAfterContentChecked() đầu tiên.

- ngAfterViewChecked(): Thực thi sau khi Angular kiểm tra các view của component và các view con /view mà directive được đưa vào. Được gọi sau
  ngAfterViewInit() và mọi ngAfterContentChecked() tiếp theo.

- ngOnDestroy(): Dọn dẹp ngay trước khi Angular phá hủy directive / component. Hủy đăng ký Observables và tách trình xử lý sự kiện để tránh rò
  rỉ bộ nhớ. Được gọi ngay trước khi Angular phá hủy directive / component.

#Component
Class, template metadata:

- Component metadata: selector, tempateUrl, template, styleUrl, providers.

#Template:

- interpolation: là phép nội suy, render giá trị trong biến của component, cú pháp: {{}} vd: {{data.name}}.

- Property binding: thiết lập một thuộc tính element trong view. cú pháp: [] vd: <button [disabled]="buttonDisabled"></button>

- Event binding: dạng này sẽ kích hoạt event từ view sang component.View sẽ gửi dữ liệu từ 1 event,
  chẳng hạn khi ta click vào button để cập nhật giá trị trong component. Nó sẽ ngược so với property binding - từ component sang view.
  vd: <button (click)="updateName()">Update button</button>

- Two-way data binding: Dạng này thì luồng dữ liệu sẽ đi 2 chiều từ component sang view và ngược lại.
  Dạng này thường dùng trong form để cập nhật giá trị khi người dùng nhập vào.
  vd: [(ngMoldu)]
