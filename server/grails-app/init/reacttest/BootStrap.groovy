package parsonOnGrails

class BootStrap {

    def init = { servletContext ->
        new Problem(title: "Hello World!", description: "simple description", problem: ["System.out.println(\"different\")", "{", "}"], submitter: "instructor1").save()
        new Problem(title: "Test #2", description: "yet another description", problem: ["System.out.println(\"Hello World\")", "{", "}"], submitter: "instructor1").save()
    }
    def destroy = {
    }
}
