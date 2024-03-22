package parsonOnGrails

class BootStrap {

    def init = { servletContext ->
        new Problem(title: "Hello World!", description: "simple description", problem: ["System.out.println(\"HelloWorld\")", "}", "{"], submitter: "instructor1", datetime: new Date()).save()
        new Problem(title: "Test #2", description: "yet another description", problem: ["System.out.println(\"testing...\")", "{", "}"], submitter: "instructor1", datetime: new Date()).save()
        new Solution(problemid: 1, solution: ["{", "System.out.println(\"Hello World\")", "}"], UFID: "12345678", datetime: new Date()).save()
        new Solution(problemid: 1, solution: ["{", "System.out.println(\"Hello World\")", "}"], UFID: "23456789", datetime: new Date()).save()
        new Solution(problemid: 2, solution: ["{", "System.out.println(\"testing...\")", "}"], UFID: "23456789", datetime: new Date()).save()
    }
    def destroy = {
    }
}
