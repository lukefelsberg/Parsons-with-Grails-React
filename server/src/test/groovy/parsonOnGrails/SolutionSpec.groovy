package parsonOnGrails

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification
import grails.test.hibernate.HibernateSpec

@SuppressWarnings(['MethodName', 'DuplicateNumberLiteral'])
class SolutionSpec extends HibernateSpec{

    void 'test domain class validation, all fields empty'() {
        when: 'A domain class (Solution) is saved with invalid data'
        Solution solution = new Solution(problemid: '', solution: [], UFID: '', datetime: '')
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'test domain class validation, no problemid'() {
        when: 'A domain class (Solution) is saved with invalid data -- no problemid'
        Solution solution = new Solution(problemid: '', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: new Date())
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'test domain class validation, no UFID'() {
        when: 'A domain class (Solution) is saved with invalid data -- no UFID'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: '', datetime: new Date())
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'test domain class validation, UFID too short'() {
        when: 'A domain class (Solution) is saved with invalid data -- UFID too short'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "1234567", datetime: new Date())
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'test domain class validation, UFID too long'() {
        when: 'A domain class (Solution) is saved with invalid data -- UFID too long'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "123456789", datetime: new Date())
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'test domain class validation, no date'() {
        when: 'A domain class (Solution) is saved with invalid data -- no date'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: '')
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'test domain class validation, empty solution array'() {
        when: 'A domain class (Solution) is saved with invalid data -- empty solution array'
        Solution solution = new Solution(problemid: '1', solution: [], UFID: "12345678", datetime: new Date())
        solution.save()

        then: 'Solution is not saved'
        Solution.count() == 0
    }

    void 'valid domain - 1'() {
        when: 'a valid domain is saved'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: new Date())
        solution.save()

        then: 'problem saved successfully'
        Solution.count() == 1
        Solution.first().problemid == '1'
    }

    void 'valid domain - 2 {edited solution}'() {
        when: 'a valid domain is saved'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: new Date())
        solution.save()
        solution.problemid = '2'
        solution.save()

        then: 'problem saved successfully'
        Solution.count() == 1
        Solution.first().problemid == '2'
    }

    void 'valid domain - 3 {multiple solutions}'() {
        when: 'a valid domains are saved'
        Solution solution = new Solution(problemid: '1', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: new Date())
        solution.save()
        Solution solution2 = new Solution(problemid: '2', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: new Date())
        solution2.save()
        Solution solution3 = new Solution(problemid: '3', solution: ["class HelloWorld {", "public static void main (String[] args) {", "System.out.println(\"Hello, world!\")", "}", "}"], UFID: "12345678", datetime: new Date())
        solution3.save()

        then: 'problem saved successfully'
        Solution.count() == 3
    }

}
