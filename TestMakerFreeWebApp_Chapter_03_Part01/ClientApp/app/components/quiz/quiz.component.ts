import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http"
@Component({
    selector: "quiz",
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent {
    quiz: Quiz;
    constructor(private activatedRouter: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {
        this.quiz = <Quiz>{};
        var id = +this.activatedRouter.snapshot.params["id"];
        console.log(id);
        if (id) {
            var url = this.baseUrl + "api/quiz/" + id;
            this.http.get<Quiz>(url).subscribe(res => {
                this.quiz = res;
            }, err => console.error(err));
        }
        else {
            console.log("invalid id: routing back home");
            this.router.navigate(["home"]);
        }
    }
}
