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
    "os"
    "strings"

    "github.com/spf13/cobra"
    "github.com/spf13/viper"
)

// Bootstrap VARs
var cfgFile, renderAs, renderTemplate, stdinType, filter string
var renderAsYml, renderAsXml, renderAsShell, renderAsJson bool

var RootCmd = &cobra.Command{
    Use:   "COP",
    Short: "COP - Configuration Output Parser",
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

// Execute adds all child commands to the root command sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
    if err := RootCmd.Execute(); err != nil {
        fmt.Println(err)
        os.Exit(-1)
    }
}

func init() {
    cobra.OnInitialize(initConfig)

    // init flags for basic parsing operations
    RootCmd.Flags().BoolVar(&renderAsYml, "yml", false, "Render as YAML")
    RootCmd.Flags().BoolVar(&renderAsJson, "json", false, "Render as JSON")
    RootCmd.Flags().BoolVar(&renderAsXml, "xml", false, "Render as XML")
    RootCmd.Flags().BoolVar(&renderAsShell, "shell", false, "Render as shell VARs")
    RootCmd.Flags().StringVar(&renderAs, "render-as", "yml", "Render format")
    RootCmd.Flags().StringVar(&stdinType, "stdin-type", "", "STDIN format")
    RootCmd.Flags().StringVar(&filter, "filter", "", "Regex pattern to match")

    // init flags for template command
    RootCmd.Flags().StringVarP(&renderTemplate, "render-template", "t", "", "Rendering template")

}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
    viper.AutomaticEnv()          // read in environment variables that match
}
