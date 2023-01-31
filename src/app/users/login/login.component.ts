import { Component, Input } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UserLoginCredentials } from "src/models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @Input() inputData = new UserLoginCredentials("", "");

  constructor(private apiService: ApiService) {}

  onSubmitForm() {
    this.apiService.userLogin(this.inputData).subscribe(
      (results) => {
        console.log(results);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
