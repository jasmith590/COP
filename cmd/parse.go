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
    "strings"

    "github.com/spf13/cobra"
)

// parseCmd represents the parse command
var parseCmd = &cobra.Command{
    Use:   "parse",
    Short: "Parse configuration from one <format> to another <format>",
    Run: func(cmd *cobra.Command, args []string) {
        if renderAsYml {
            fmt.Println("Render as YML")
        }

        if renderAsJson {
            fmt.Println("Render as JSON")
        }

        if renderAsXml {
            fmt.Println("Render as XML")
        }

        if renderAsShell {
            fmt.Println("Render as shell VARs")
        }

        fmt.Println("Print: " + strings.Join(args, " "))
    },
}

func init() {
    RootCmd.AddCommand(parseCmd)

    // init flags for parse command
    parseCmd.Flags().BoolVar(&renderAsYml, "yml", false, "Render as YAML")
    parseCmd.Flags().BoolVar(&renderAsJson, "json", false, "Render as JSON")
    parseCmd.Flags().BoolVar(&renderAsXml, "xml", false, "Render as XML")
    parseCmd.Flags().BoolVar(&renderAsShell, "shell", false, "Render as shell VARs")
    parseCmd.Flags().StringVar(&renderAs, "render-as", "yml", "Render format")
    parseCmd.Flags().StringVar(&stdinType, "stdin-type", "", "STDIN format")
    parseCmd.Flags().StringVar(&filter, "filter", "", "Regex pattern to match")

    // Cobra supports local flags which will only run when this command
    // is called directly, e.g.:
    // parseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")

}
