Feature: NewQuerySideProject should generate a project
  This is the sample Gherkin feature file for the BDD tests of
  the Rug generator for a Spring Boot - Command Side project.
  Feel free to modify and extend to suit the needs of your generator.


  Scenario: NewQuerySideProject should create a new project based on this seed
    Given an empty project
    When NewQuerySideProject is run
    Then parameters were valid
    Then the README file exists
