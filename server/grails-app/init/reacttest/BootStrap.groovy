package parsonOnGrails

class BootStrap {

    def init = { servletContext ->
        new Problem(id: "0", title: "Hello World!", description: "simple description", problem: ["System.out.println(\"Hello World\")", "{", "}"], submitter: "instructor1", date: new Date()).save()
        new Problem(id: "1", title: "Test #2", description: "yet another description", problem: ["System.out.println(\"Hello World\")", "{", "}"], submitter: "instructor1", date: new Date()).save()
    }
    def destroy = {
    }
}
