package parsonOnGrails

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class ProblemSpec extends Specification implements DomainUnitTest<Problem> {

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        expect:"fix me"
        true == false
    }
}
