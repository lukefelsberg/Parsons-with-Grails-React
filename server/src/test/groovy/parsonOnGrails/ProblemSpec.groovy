package parsonOnGrails

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification
import grails.test.hibernate.HibernateSpec

@SuppressWarnings(['MethodName', 'DuplicateNumberLiteral'])
class ProblemSpec extends HibernateSpec {
    
    void 'test domain class validation, all fields empty'() {
        when: 'A domain class (Problem) is saved with invalid data'
        Problem problem = new Problem(title: '', description: '', problem: [], submitter: '', datetime: '')
        problem.save()

        then: 'Problem is not saved'
        Problem.count() == 0
    }

    void 'test domain class validation, no title'() {
        when: 'A domain class (Problem) is saved with invalid data -- no title'
        Problem problem = new Problem(title: '', description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem.save()

        then: 'Problem is not saved'
        Problem.count() == 0
    }

    void 'test domain class validation, no description'() {
        when: 'A domain class (Problem) is saved with invalid data -- no description'
        Problem problem = new Problem(title: "Hello World!", description: '', problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem.save()

        then: 'Problem is not saved'
        Problem.count() == 0
    }

    void 'test domain class validation, no submitter'() {
        when: 'A domain class (Problem) is saved with invalid data -- no submitter'
        Problem problem = new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: '', datetime: new Date())
        problem.save()

        then: 'Problem is not saved'
        Problem.count() == 0
    }

    void 'test domain class validation, no datetime'() {
        when: 'A domain class (Problem) is saved with invalid data -- no datetime'
        Problem problem = new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: '')
        problem.save()

        then: 'Problem is not saved'
        Problem.count() == 0
    }

    void 'test domain class validation, empty problem array'() {
        when: 'A domain class (Problem) is saved with invalid data -- empty problem array'
        Problem problem = new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: [], submitter: "Luke Felsberg", datetime: new Date())
        problem.save()

        then: 'Problem is not saved'
        Problem.count() == 0
    }

    void 'valid domain - 1'() {
        when: 'a valid domain is saved'
        Problem problem = new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem.save()

        then: 'problem saved successfully'
        Problem.count() == 1
        Problem.first().title == 'Hello World!'
    }

    void 'valid domain - 2 {edited problem}'() {
        when: 'a valid domain is saved'
        Problem problem1 = new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem1.save()
        problem1.title = "Goodbye World!"
        problem1.save()

        then: 'problem saved successfully'
        Problem.count() == 1
        Problem.first().title == 'Goodbye World!'
        
    }

    void 'valid domain - 3 {multiple problems}'() {
        when: 'a valid domains are saved'
        Problem problem1 = new Problem(title: "Hello World!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem1.save()
        Problem problem2 = new Problem(title: "Hello World!!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem2.save()
        Problem problem3 = new Problem(title: "Hello World!!!", description: "Simple print function written in Java", problem: ["System.out.println(\"Hello, world!\")", "}", "}", "public static void main (String[] args) {", "class HelloWorld {"], submitter: "Luke Felsberg", datetime: new Date())
        problem3.save()

        then: 'problem saved successfully'
        Problem.count() == 3        
    }

}
