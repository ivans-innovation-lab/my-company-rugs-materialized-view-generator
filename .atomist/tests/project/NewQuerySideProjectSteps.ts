import { Project } from "@atomist/rug/model/Project";
import {
    Given, ProjectScenarioWorld, Then, When,
} from "@atomist/rug/test/project/Core";

When("NewQuerySideProject is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const generator = w.generator("NewQuerySideProject");
    w.generateWith(generator, "new-test-project", {});
});

Then("the README file exists", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    return p.fileExists("README.md");
});
