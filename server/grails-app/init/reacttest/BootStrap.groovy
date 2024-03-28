package parsonOnGrails

class BootStrap {

    def init = { servletContext ->
        new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\");", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date()).save()
        new Problem(title: "Hello World, but in Python", description: "Same as last time, but in Python", problem: ["print('Hello, world!')", "# This problem prints Hello, world!"], submitter: "Luke Felsberg", datetime: new Date()).save()
        new Solution(problemid: 1, solution: ["class HelloWorld {", "}", "public static void main (String[] args) {", "}", "System.out.println(\"Hello, world!\");"], UFID: "12345678", datetime: new Date()).save()
        new Solution(problemid: 1, solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\");", "}", "}"], UFID: "23456789", datetime: new Date()).save()
        new Solution(problemid: 2, solution: ["print('Hello, world!')", "# This problem prints Hello, world!"], UFID: "12345678", datetime: new Date()).save()
    }
    def destroy = {
    }
}
