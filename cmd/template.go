// Copyright © 2017 NAME HERE <EMAIL ADDRESS>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
    "fmt"

    "github.com/spf13/cobra"
)

// templateCmd represents the template command
var templateCmd = &cobra.Command{
    Use:   "template",
    Short: "Parse configuration into a template",
    Run: func(cmd *cobra.Command, args []string) {
        // TODO: Work your own magic here
        fmt.Println("template called")
    },
}

func init() {
    RootCmd.AddCommand(templateCmd)

    // init flags for template command
    templateCmd.Flags().StringVarP(&renderTemplate, "render-template", "t", "", "Rendering template")

}
